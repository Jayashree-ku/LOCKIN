'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient, isSupabaseConfigured } from '../supabase/client';
import { StudentProfile, StudentPreferences } from '../types';

interface AuthContextType {
  user: any | null;
  profile: StudentProfile | null;
  preferences: StudentPreferences | null;
  isLoading: boolean;
  isConfigured: boolean;
  isDemoUser: boolean;
  savedBranchIds: string[];
  completedMilestoneIds: string[];
  savedResourceIds: string[];
  signIn: (email: string, pass: string) => Promise<{ data?: any; error: any | null }>;
  signUp: (email: string, pass: string, fullName: string) => Promise<{ data?: any; error: any | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any | null }>;
  toggleSaveBranch: (branchId: string) => void;
  toggleCompleteMilestone: (milestoneId: string) => void;
  toggleSaveResource: (resourceId: string) => void;
  updateBranchSelection: (branchId: string) => void;
  updatePreferences: (prefs: Partial<StudentPreferences>) => void;
}

const DEMO_PROFILE: StudentProfile = {
  id: '00000000-0000-0000-0000-000000000001',
  full_name: 'Jayashree',
  avatar_url: '',
  education_level: '2nd Year B.Tech',
  selected_branch_id: '22222222-0001-0000-0000-000000000001', // AI & Data Science
  current_year: 2,
  bio: 'Aspiring AI engineer passionate about computer vision and generative systems.',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const DEMO_PREFERENCES: StudentPreferences = {
  id: 'pref-001',
  student_id: '00000000-0000-0000-0000-000000000001',
  has_chosen_branch: true,
  favourite_subjects: ['Maths', 'Computer Science', 'Physics'],
  academic_interests: ['Algorithms', 'Linear Algebra'],
  work_interests: ['Coding & Development', 'AI & Data Science'],
  learning_preferences: ['Hands-on Projects', 'Structured Roadmap'],
};

const DEMO_SAVED_BRANCHES = [
  '22222222-0002-0000-0000-000000000002', // CS
  '22222222-0003-0000-0000-000000000003', // ECE
  '22222222-0004-0000-0000-000000000004', // Mech
];

const DEMO_COMPLETED_MILESTONES = [
  '55555555-0001-0000-0000-000000000001', // Python Core
  '55555555-0001-0000-0000-000000000002', // Git
  '55555555-0001-0000-0000-000000000004', // DSA
  '55555555-0001-0000-0000-000000000005', // Linear Algebra
];

const DEMO_SAVED_RESOURCES = [
  '66666666-0001-0000-0000-000000000001',
  '66666666-0001-0000-0000-000000000003',
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [preferences, setPreferences] = useState<StudentPreferences | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);

  // In-session tracking (starts empty until user is authenticated)
  const [savedBranchIds, setSavedBranchIds] = useState<string[]>([]);
  const [completedMilestoneIds, setCompletedMilestoneIds] = useState<string[]>([]);
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>([]);

  useEffect(() => {
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    if (!configured) {
      // Check if there is an active offline session cookie
      const hasSessionCookie =
        typeof document !== 'undefined' &&
        document.cookie
          .split(';')
          .some((item) => item.trim().startsWith('lockin_session=true'));

      if (hasSessionCookie) {
        setUser({ id: DEMO_PROFILE.id, email: 'jayashree@student.lockin.dev' });
        setProfile(DEMO_PROFILE);
        setPreferences(DEMO_PREFERENCES);
        setSavedBranchIds(DEMO_SAVED_BRANCHES);
        setCompletedMilestoneIds(DEMO_COMPLETED_MILESTONES);
        setSavedResourceIds(DEMO_SAVED_RESOURCES);
        setIsDemoUser(true);
      } else {
        setUser(null);
        setProfile(null);
        setPreferences(null);
        setSavedBranchIds([]);
        setCompletedMilestoneIds([]);
        setSavedResourceIds([]);
        setIsDemoUser(false);
      }
      setIsLoading(false);
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    // Check active session using recommended auth.getUser()
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (user && !error) {
        setUser(user);
        setIsDemoUser(false);
        fetchProfile(user.id, supabase);
      } else {
        // Unauthenticated visitor
        setUser(null);
        setProfile(null);
        setPreferences(null);
        setSavedBranchIds([]);
        setCompletedMilestoneIds([]);
        setSavedResourceIds([]);
        setIsLoading(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsDemoUser(false);
        fetchProfile(session.user.id, supabase);
      } else {
        setUser(null);
        setProfile(null);
        setPreferences(null);
        setSavedBranchIds([]);
        setCompletedMilestoneIds([]);
        setSavedResourceIds([]);
        setIsLoading(false);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string, supabase: any) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && !error) {
        setProfile(data);
      }

      const { data: prefData } = await supabase
        .from('student_preferences')
        .select('*')
        .eq('student_id', userId)
        .single();

      if (prefData) {
        setPreferences(prefData);
      }

      // Fetch saved branches
      const { data: branches } = await supabase
        .from('saved_branches')
        .select('branch_id')
        .eq('student_id', userId);
      if (branches) {
        setSavedBranchIds(branches.map((b: any) => b.branch_id));
      }

      // Fetch progress
      const { data: progress } = await supabase
        .from('student_progress')
        .select('milestone_id')
        .eq('student_id', userId)
        .eq('is_completed', true);
      if (progress) {
        setCompletedMilestoneIds(progress.map((p: any) => p.milestone_id));
      }

      // Fetch saved resources
      const { data: resources } = await supabase
        .from('saved_resources')
        .select('resource_id')
        .eq('student_id', userId);
      if (resources) {
        setSavedResourceIds(resources.map((r: any) => r.resource_id));
      }
    } catch (err) {
      console.error('Error fetching student profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, pass: string) => {
    const supabase = createClient();
    if (!supabase) {
      // Local testing / Demo login
      if (typeof document !== 'undefined') {
        document.cookie = 'lockin_session=true; path=/; max-age=604800; SameSite=Lax';
      }
      const demoEmail = email.trim();
      setUser({ id: DEMO_PROFILE.id, email: demoEmail });
      setProfile({ ...DEMO_PROFILE, full_name: demoEmail.split('@')[0] });
      setPreferences(DEMO_PREFERENCES);
      setSavedBranchIds(DEMO_SAVED_BRANCHES);
      setCompletedMilestoneIds(DEMO_COMPLETED_MILESTONES);
      setSavedResourceIds(DEMO_SAVED_RESOURCES);
      setIsDemoUser(true);
      return { data: { user: { id: DEMO_PROFILE.id, email: demoEmail } }, error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: pass,
    });
    return { data, error };
  };

  const signUp = async (email: string, pass: string, fullName: string) => {
    const supabase = createClient();
    if (!supabase) {
      // Local testing / Demo signup
      if (typeof document !== 'undefined') {
        document.cookie = 'lockin_session=true; path=/; max-age=604800; SameSite=Lax';
      }
      const demoEmail = email.trim();
      setUser({ id: DEMO_PROFILE.id, email: demoEmail });
      setProfile({ ...DEMO_PROFILE, full_name: fullName.trim() });
      setPreferences(DEMO_PREFERENCES);
      setSavedBranchIds(DEMO_SAVED_BRANCHES);
      setCompletedMilestoneIds(DEMO_COMPLETED_MILESTONES);
      setSavedResourceIds(DEMO_SAVED_RESOURCES);
      setIsDemoUser(true);
      return { data: { user: { id: DEMO_PROFILE.id, email: demoEmail } }, error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: pass,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });
    return { data, error };
  };

  const signOut = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    if (typeof document !== 'undefined') {
      document.cookie = 'lockin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch {
        // Storage clear protection
      }
    }
    setUser(null);
    setProfile(null);
    setPreferences(null);
    setSavedBranchIds([]);
    setCompletedMilestoneIds([]);
    setSavedResourceIds([]);
    setIsDemoUser(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  const resetPassword = async (email: string) => {
    const supabase = createClient();
    if (!supabase) {
      return { error: null };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback?next=/profile`,
    });
    return { error };
  };

  const toggleSaveBranch = (branchId: string) => {
    if (!user) return; // Only authenticated users
    setSavedBranchIds((prev) => {
      const exists = prev.includes(branchId);
      const next = exists ? prev.filter((id) => id !== branchId) : [...prev, branchId];

      const supabase = createClient();
      if (supabase && user && !isDemoUser) {
        if (exists) {
          supabase.from('saved_branches').delete().match({ student_id: user.id, branch_id: branchId }).then();
        } else {
          supabase.from('saved_branches').insert({ student_id: user.id, branch_id: branchId }).then();
        }
      }
      return next;
    });
  };

  const toggleCompleteMilestone = (milestoneId: string) => {
    if (!user) return; // Only authenticated users
    setCompletedMilestoneIds((prev) => {
      const exists = prev.includes(milestoneId);
      const next = exists ? prev.filter((id) => id !== milestoneId) : [...prev, milestoneId];

      const supabase = createClient();
      if (supabase && user && !isDemoUser) {
        if (exists) {
          supabase.from('student_progress').delete().match({ student_id: user.id, milestone_id: milestoneId }).then();
        } else {
          supabase.from('student_progress').upsert({
            student_id: user.id,
            milestone_id: milestoneId,
            is_completed: true,
            completed_at: new Date().toISOString(),
          }).then();
        }
      }
      return next;
    });
  };

  const toggleSaveResource = (resourceId: string) => {
    if (!user) return; // Only authenticated users
    setSavedResourceIds((prev) => {
      const exists = prev.includes(resourceId);
      const next = exists ? prev.filter((id) => id !== resourceId) : [...prev, resourceId];

      const supabase = createClient();
      if (supabase && user && !isDemoUser) {
        if (exists) {
          supabase.from('saved_resources').delete().match({ student_id: user.id, resource_id: resourceId }).then();
        } else {
          supabase.from('saved_resources').insert({ student_id: user.id, resource_id: resourceId }).then();
        }
      }
      return next;
    });
  };

  const updateBranchSelection = (branchId: string) => {
    if (!user) return; // Only authenticated users
    if (profile) {
      setProfile({ ...profile, selected_branch_id: branchId });
    }
    const supabase = createClient();
    if (supabase && user && !isDemoUser) {
      supabase.from('profiles').update({ selected_branch_id: branchId }).eq('id', user.id).then();
    }
  };

  const updatePreferences = (newPrefs: Partial<StudentPreferences>) => {
    if (!user) return; // Only authenticated users
    setPreferences((prev) => {
      const updated = prev ? { ...prev, ...newPrefs } : ({ ...DEMO_PREFERENCES, ...newPrefs } as StudentPreferences);
      const supabase = createClient();
      if (supabase && user && !isDemoUser) {
        supabase.from('student_preferences').upsert({
          ...updated,
          student_id: user.id,
        }).then();
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        preferences,
        isLoading,
        isConfigured,
        isDemoUser,
        savedBranchIds,
        completedMilestoneIds,
        savedResourceIds,
        signIn,
        signUp,
        signOut,
        resetPassword,
        toggleSaveBranch,
        toggleCompleteMilestone,
        toggleSaveResource,
        updateBranchSelection,
        updatePreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
