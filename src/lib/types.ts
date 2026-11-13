// LOCKIN Core Domain Types

export type EngineeringCategory = 
  | 'All'
  | 'Computer Science'
  | 'Circuits & AI'
  | 'Core Engineering'
  | 'Electronics'
  | 'Mechanical'
  | 'Civil';

export interface Branch {
  id: string;
  name: string;
  slug: string;
  short_name: string;
  tagline: string;
  description: string;
  why_choose: string[];
  subjects_overview: string[];
  tools_technologies: string[];
  career_opportunities: CareerOpportunity[];
  specializations: string[];
  industry_applications: string[];
  higher_studies: string[];
  icon_name: string;
  category: string;
  is_popular: boolean;
  hero_bg_accent: string;
}

export interface CareerOpportunity {
  title: string;
  avg_salary: string;
  growth: string;
  description: string;
}

export interface Roadmap {
  id: string;
  branch_id: string;
  title: string;
  description: string;
  total_semesters: number;
  semesters?: Semester[];
}

export interface Semester {
  id: string;
  roadmap_id: string;
  semester_number: number;
  year_number: number;
  title: string;
  focus_area: string;
  order_index: number;
  milestones?: RoadmapMilestone[];
}

export type MilestoneType = 'skill' | 'technology' | 'project' | 'internship' | 'career_prep' | 'academic';
export type MilestoneImportance = 'essential' | 'recommended' | 'bonus';

export interface RoadmapMilestone {
  id: string;
  semester_id: string;
  title: string;
  description: string;
  milestone_type: MilestoneType;
  importance: MilestoneImportance;
  order_index: number;
  resources?: Resource[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon_name: string;
  description: string;
  importance_level: 'High' | 'Medium' | 'Low';
}

export type ResourceType = 
  | 'youtube' 
  | 'documentation' 
  | 'free_course' 
  | 'paid_course' 
  | 'article' 
  | 'practice_platform' 
  | 'book';

export interface Resource {
  id: string;
  title: string;
  url: string;
  resource_type: ResourceType;
  skill_id?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  is_free: boolean;
  pricing_label: string;
  recommended_order: number;
  description: string;
  provider: string;
  is_verified: boolean;
  skill?: Skill;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  branch_id: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  required_technologies: string[];
  skills_gained: string[];
  learning_guidance: string;
  starter_repo_url?: string;
  year_recommended: number;
  order_index: number;
}

export interface StudentProfile {
  id: string;
  full_name: string;
  avatar_url?: string;
  education_level: string;
  selected_branch_id?: string;
  current_year: number;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentPreferences {
  id: string;
  student_id: string;
  has_chosen_branch: boolean;
  favourite_subjects: string[];
  academic_interests: string[];
  work_interests: string[];
  learning_preferences: string[];
  quiz_answers?: Record<string, string>;
  suggested_branch_ids?: string[];
}

export interface StudentProgress {
  id: string;
  student_id: string;
  milestone_id: string;
  is_completed: boolean;
  completed_at?: string;
  notes?: string;
}

export interface SavedResource {
  id: string;
  student_id: string;
  resource_id: string;
  is_completed: boolean;
  saved_at: string;
  completed_at?: string;
}

export interface StudentProject {
  id: string;
  student_id: string;
  project_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  repo_url?: string;
  live_url?: string;
  updated_at: string;
}

export interface SavedBranch {
  id: string;
  student_id: string;
  branch_id: string;
  saved_at: string;
}
