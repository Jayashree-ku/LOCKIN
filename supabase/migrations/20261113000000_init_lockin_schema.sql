-- ==============================================================================
-- LOCKIN Database Schema Migration
-- Schema Version: 20261113000000
-- Target: PostgreSQL 14+ with Supabase Auth & Row Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES (Extends Supabase auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  education_level TEXT DEFAULT '12th Grade',
  selected_branch_id UUID,
  current_year INTEGER DEFAULT 1 CHECK (current_year BETWEEN 1 AND 4),
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 2. BRANCHES (Shared Reference Data)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  short_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  why_choose JSONB DEFAULT '[]'::jsonb,
  subjects_overview JSONB DEFAULT '[]'::jsonb,
  tools_technologies JSONB DEFAULT '[]'::jsonb,
  career_opportunities JSONB DEFAULT '[]'::jsonb,
  specializations JSONB DEFAULT '[]'::jsonb,
  industry_applications JSONB DEFAULT '[]'::jsonb,
  higher_studies JSONB DEFAULT '[]'::jsonb,
  icon_name TEXT NOT NULL DEFAULT 'BookOpen',
  category TEXT NOT NULL DEFAULT 'Computer Science',
  is_popular BOOLEAN DEFAULT false,
  hero_bg_accent TEXT DEFAULT 'blue',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add foreign key constraint to profiles now that branches exists
ALTER TABLE public.profiles 
  DROP CONSTRAINT IF EXISTS fk_profiles_selected_branch,
  ADD CONSTRAINT fk_profiles_selected_branch 
  FOREIGN KEY (selected_branch_id) REFERENCES public.branches(id) ON DELETE SET NULL;

-- ------------------------------------------------------------------------------
-- 3. STUDENT_PREFERENCES (Student Onboarding & Quiz State)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  has_chosen_branch BOOLEAN DEFAULT false,
  favourite_subjects TEXT[] DEFAULT '{}',
  academic_interests TEXT[] DEFAULT '{}',
  work_interests TEXT[] DEFAULT '{}',
  learning_preferences TEXT[] DEFAULT '{}',
  quiz_answers JSONB DEFAULT '{}'::jsonb,
  suggested_branch_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 4. ROADMAPS (Branch 4-Year Curated Pathways - Shared Reference Data)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id UUID NOT NULL UNIQUE REFERENCES public.branches(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  total_semesters INTEGER DEFAULT 8 CHECK (total_semesters BETWEEN 1 AND 12),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 5. SEMESTERS (Semester Progression 1..8 - Shared Reference Data)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.semesters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  roadmap_id UUID NOT NULL REFERENCES public.roadmaps(id) ON DELETE CASCADE,
  semester_number INTEGER NOT NULL CHECK (semester_number BETWEEN 1 AND 12),
  year_number INTEGER NOT NULL CHECK (year_number BETWEEN 1 AND 6),
  title TEXT NOT NULL,
  focus_area TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(roadmap_id, semester_number)
);

-- ------------------------------------------------------------------------------
-- 6. ROADMAP_MILESTONES (Actionable learning milestones - Shared Reference Data)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.roadmap_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  semester_id UUID NOT NULL REFERENCES public.semesters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  milestone_type TEXT NOT NULL CHECK (milestone_type IN ('skill', 'technology', 'project', 'internship', 'career_prep', 'academic')),
  importance TEXT DEFAULT 'essential' CHECK (importance IN ('essential', 'recommended', 'bonus')),
  order_index INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 7. SKILLS (Core Competencies & Technologies - Shared Reference Data)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'Core Engineering',
  icon_name TEXT DEFAULT 'Code',
  description TEXT,
  importance_level TEXT DEFAULT 'High',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 8. RESOURCES (Verified Learning Materials - Shared Reference Data)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('youtube', 'documentation', 'free_course', 'paid_course', 'article', 'practice_platform', 'book')),
  skill_id UUID REFERENCES public.skills(id) ON DELETE SET NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
  is_free BOOLEAN NOT NULL DEFAULT true,
  pricing_label TEXT NOT NULL DEFAULT 'Free',
  recommended_order INTEGER NOT NULL DEFAULT 1,
  description TEXT NOT NULL,
  provider TEXT NOT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 9. MILESTONE_RESOURCES (Junction Table: Milestones <-> Resources)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.milestone_resources (
  milestone_id UUID NOT NULL REFERENCES public.roadmap_milestones(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
  PRIMARY KEY (milestone_id, resource_id)
);

-- ------------------------------------------------------------------------------
-- 10. PROJECTS (Curated Industry & Academic Projects - Shared Reference Data)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  branch_id UUID NOT NULL REFERENCES public.branches(id) ON DELETE CASCADE,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  description TEXT NOT NULL,
  required_technologies TEXT[] NOT NULL DEFAULT '{}',
  skills_gained TEXT[] NOT NULL DEFAULT '{}',
  learning_guidance TEXT NOT NULL,
  starter_repo_url TEXT,
  year_recommended INTEGER NOT NULL DEFAULT 1 CHECK (year_recommended BETWEEN 1 AND 4),
  order_index INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 11. STUDENT_PROGRESS (Student Milestone Completion - Private Student Data)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  milestone_id UUID NOT NULL REFERENCES public.roadmap_milestones(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(student_id, milestone_id)
);

-- ------------------------------------------------------------------------------
-- 12. SAVED_RESOURCES (Student Bookmark & Resource Status - Private Student Data)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  saved_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  completed_at TIMESTAMPTZ,
  UNIQUE(student_id, resource_id)
);

-- ------------------------------------------------------------------------------
-- 13. STUDENT_PROJECTS (Student Project Tracker - Private Student Data)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  repo_url TEXT,
  live_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(student_id, project_id)
);

-- ------------------------------------------------------------------------------
-- 14. SAVED_BRANCHES (Student Favorited Branches - Private Student Data)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  branch_id UUID NOT NULL REFERENCES public.branches(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(student_id, branch_id)
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_branches_slug ON public.branches(slug);
CREATE INDEX IF NOT EXISTS idx_branches_category ON public.branches(category);
CREATE INDEX IF NOT EXISTS idx_roadmaps_branch ON public.roadmaps(branch_id);
CREATE INDEX IF NOT EXISTS idx_semesters_roadmap ON public.semesters(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_milestones_semester ON public.roadmap_milestones(semester_id);
CREATE INDEX IF NOT EXISTS idx_resources_skill ON public.resources(skill_id);
CREATE INDEX IF NOT EXISTS idx_projects_branch ON public.projects(branch_id);
CREATE INDEX IF NOT EXISTS idx_student_progress_student ON public.student_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_saved_resources_student ON public.saved_resources(student_id);
CREATE INDEX IF NOT EXISTS idx_student_projects_student ON public.student_projects(student_id);
CREATE INDEX IF NOT EXISTS idx_saved_branches_student ON public.saved_branches(student_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestone_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_branches ENABLE ROW LEVEL SECURITY;

-- 1. Shared Reference Data: Readable by anyone (public or authenticated)
CREATE POLICY "Public read branches" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Public read roadmaps" ON public.roadmaps FOR SELECT USING (true);
CREATE POLICY "Public read semesters" ON public.semesters FOR SELECT USING (true);
CREATE POLICY "Public read roadmap_milestones" ON public.roadmap_milestones FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public read resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Public read milestone_resources" ON public.milestone_resources FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);

-- 2. Profiles: Students can only view and update their own profile
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Student Preferences: Students can only view and update their own preferences
CREATE POLICY "Users can read own preferences" ON public.student_preferences FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Users can insert own preferences" ON public.student_preferences FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Users can update own preferences" ON public.student_preferences FOR UPDATE USING (auth.uid() = student_id);

-- 4. Student Progress: Students can only view and modify their own progress
CREATE POLICY "Users can read own progress" ON public.student_progress FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Users can insert own progress" ON public.student_progress FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Users can update own progress" ON public.student_progress FOR UPDATE USING (auth.uid() = student_id);
CREATE POLICY "Users can delete own progress" ON public.student_progress FOR DELETE USING (auth.uid() = student_id);

-- 5. Saved Resources: Students can only view and modify their own saved resources
CREATE POLICY "Users can read own saved resources" ON public.saved_resources FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Users can insert own saved resources" ON public.saved_resources FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Users can update own saved resources" ON public.saved_resources FOR UPDATE USING (auth.uid() = student_id);
CREATE POLICY "Users can delete own saved resources" ON public.saved_resources FOR DELETE USING (auth.uid() = student_id);

-- 6. Student Projects: Students can only view and modify their own project tracking
CREATE POLICY "Users can read own projects" ON public.student_projects FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Users can insert own projects" ON public.student_projects FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Users can update own projects" ON public.student_projects FOR UPDATE USING (auth.uid() = student_id);
CREATE POLICY "Users can delete own projects" ON public.student_projects FOR DELETE USING (auth.uid() = student_id);

-- 7. Saved Branches: Students can only view and modify their own saved branches
CREATE POLICY "Users can read own saved branches" ON public.saved_branches FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Users can insert own saved branches" ON public.saved_branches FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Users can delete own saved branches" ON public.saved_branches FOR DELETE USING (auth.uid() = student_id);

-- ==============================================================================
-- AUTOMATED PROFILE CREATION ON USER SIGNUP TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, education_level)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Lockin Student'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    '12th Grade'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.student_preferences (student_id, has_chosen_branch)
  VALUES (NEW.id, false)
  ON CONFLICT (student_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
