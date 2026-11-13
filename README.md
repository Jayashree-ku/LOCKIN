# LOCKIN — Stop Guessing. Start Locking In.

> **Engineering Branch Discovery and 4-Year Career Roadmap Platform**  
> Designed primarily for 12th-grade students and undergraduate engineers to discover their ideal branch, navigate university curricula, and master industry-standard skills.

---

## 1. Project Overview

**LOCKIN** solves two fundamental challenges faced by aspiring engineers:
1. **Students who haven't selected a branch** need interactive discovery, subject suitability matching, and unbiased career insights.
2. **Students who have chosen a branch** need structured semester-by-semester clarity across four years regarding core courses, industry technologies, portfolio projects, internships, and placement prep.

**Core Promise:** *Choose your branch. Understand your future. Know what to do next.*

---

## 2. Technology Stack

- **Frontend Framework:** [Next.js](https://nextjs.org/) (App Router, Server & Client Components) with TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom design tokens
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL 14+)
- **Authentication:** Supabase Auth with Row Level Security (RLS) & fallback interactive session engine
- **Version Control:** Git & GitHub
- **Deployment Platform:** Vercel

---

## 3. Brand Identity & Design System

The visual design meticulously follows the provided designs:
- **Navy (`#14213D`):** Primary brand canvas (~60%)
- **Cream (`#F4EDE0`):** Secondary editorial surface and high-contrast card background (~30%)
- **Midnight Black (`#0B0B0C`):** Base canvas and strong typographic contrast (~10%)
- **Design Principles:**
  - Asymmetric Bento Grid layouts with backdrop glassmorphism (`backdrop-blur-md`, subtle borders)
  - Editorial Gen Z typography with italicized serif/script accents (`Caveat` cursive)
  - Atmospheric cosmic lighting with stairs leading to an illuminated portal and student silhouette
  - Zero emoji icons (strict Lucide React usage), no excessive purple gradients, no fake claims

---

## 4. Implemented Website Modules & Pages

| Route | Module | Description | Design Alignment |
|---|---|---|---|
| `/` | **Landing Page** | Hero section with cosmic stairs visual, dual-track bento cards ("Still figuring it out?" & "Already picked your branch?"), popular branches pills, 4-step flowchart, bottom horizon CTA, footer. | Matches Image 2 |
| `/login` | **Authentication (Login)** | Split-screen layout: left celestial artwork & social proof bar (50K+ students), right cream container with Google OAuth, email/password, toggle pill, social buttons. | Matches Image 1 |
| `/signup` | **Authentication (Sign Up)** | Dual-column registration flow with automatic user profile creation. | Matches Image 1 |
| `/forgot-password` | **Password Recovery** | Secure password reset submission with email dispatch confirmation. | Complete Auth |
| `/onboarding` | **Student Onboarding** | 4-step wizard: branch status (exploring vs chosen branch selector), enjoyed subjects pills, work interest cards, and automatic roadmap unlock. | Matches Image 3 (Screen A) |
| `/dashboard` | **Student Dashboard** | Bento grid with current branch hero banner, study year stat (02), roadmap progress (60%), Next Moves action items, Saved Branches, 4-Year Preview, and Dream It card. | Matches Image 3 (Screen B) |
| `/discover` | **Branch Discovery** | Search bar, category filters (All, CS, Core Engineering, Electronics, Mechanical, Civil), 3D planet header, branch cards with tags & bookmarking, career quiz banner. | Matches Image 4 (Screen A) |
| `/branches/[slug]` | **Branch Details** | Dynamic branch hub with 3D neural brain graphic, 6 interactive tabs (Overview, Subjects, Skills, Careers, Projects, Higher Studies), and "Build my roadmap" CTA. | Matches Image 4 (Screen B) |
| `/roadmap` | **4-Year Roadmap** | Interactive semester explorer (Semesters 1 to 8), filtering by Year 1–4 and milestone type (skills, tech, projects, internships, career prep), persistent checkbox tracking. | Module F |
| `/learn` | **LOCKIN Learn Hub** | Verified educational resources (CS50, Python docs, NeetCode, PyTorch blitz, Fast.ai, SQLBolt), filterable by difficulty, type, and free/paid status. | Module G |
| `/projects` | **Project Ideas** | Curated portfolio projects with required technologies, skills gained, guidance, starter repositories, and personal progress status toggles. | Module H |
| `/quiz` | **Suitability Quiz** | 4-question weighted decision engine recommending top 3 matched engineering branches with direct "Lock In" actions. | Module D / Undecided |
| `/profile` | **Student Profile** | Personal information, academic year management, branch switcher, completed milestones counter, and saved resource bookmarks. | Module J |

---

## 5. Database Architecture (Supabase PostgreSQL)

The database schema is fully normalized and organized into shared reference data and private student records.

### 14 Normalized Tables

1. **`profiles`**: Extends `auth.users` with `full_name`, `avatar_url`, `education_level`, `selected_branch_id`, and `current_year`.
2. **`branches`**: Shared reference data for engineering branches (CSE, AI & DS, ISE, ECE, EEE, ME, Civil) with JSONB columns for curriculum, career paths, salaries, tools, and specializations.
3. **`student_preferences`**: Stores student onboarding choices, favorite subjects, work interests, and quiz answers.
4. **`roadmaps`**: 4-year undergraduate curated pathway records (1:1 with branches).
5. **`semesters`**: Semesters 1 through 8 with distinct titles and focus areas.
6. **`roadmap_milestones`**: Actionable semester items classified by `skill`, `technology`, `project`, `internship`, `career_prep`, and `academic`.
7. **`skills`**: Master list of core technical competencies and software tools.
8. **`resources`**: Verified learning materials with URLs, difficulty, pricing labels, and recommended learning order.
9. **`milestone_resources`**: Many-to-many junction table connecting roadmap milestones to verified resources.
10. **`projects`**: Real-world portfolio project specifications linked to branches.
11. **`student_progress`**: Tracks per-student milestone completion without colliding with other students.
12. **`saved_resources`**: Student bookmarks for learning materials with completion status.
13. **`student_projects`**: Personal project tracking (`not_started`, `in_progress`, `completed`) with custom repo and live URLs.
14. **`saved_branches`**: Student favorited branches list.

### Security & Row Level Security (RLS) Policies
- All 14 tables have Row Level Security enabled (`ENABLE ROW LEVEL SECURITY`).
- Shared reference tables (`branches`, `roadmaps`, `semesters`, `roadmap_milestones`, `skills`, `resources`, `projects`) allow public read access (`SELECT USING (true)`).
- Private tables (`profiles`, `student_preferences`, `student_progress`, `saved_resources`, `student_projects`, `saved_branches`) strictly enforce `auth.uid() = student_id` for SELECT, INSERT, UPDATE, and DELETE.
- Automated trigger (`on_auth_user_created`) creates a `profiles` and `student_preferences` record upon new Supabase user signup.

---

## 6. Supabase Setup Guide

To connect your live Supabase database:

1. Create a project at [supabase.com](https://supabase.com/).
2. In the Supabase dashboard, navigate to **SQL Editor**.
3. Copy and run the schema migration file:
   `supabase/migrations/20261113000000_init_lockin_schema.sql`
4. In the SQL Editor, copy and run the starter seed data script:
   `supabase/seed.sql`
5. In **Project Settings > API**, copy:
   - **Project URL**
   - **anon / public key**
6. Create `.env.local` in your root project directory:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

*(Note: If no credentials are provided, LOCKIN seamlessly operates in interactive Demo Mode with complete preloaded reference datasets, allowing complete client-side testing without crashes).*

---

## 7. Local Development & Production Build

### Running Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm start
```
The production build compiles 16 optimized static and dynamic routes with zero TypeScript or webpack errors.

---

## 8. Vercel Deployment Instructions

1. Push your repository to **GitHub**:
   ```bash
   git remote add origin https://github.com/your-username/lockin.git
   git push -u origin main
   ```
2. Log into [vercel.com](https://vercel.com/) and click **Add New > Project**.
3. Import your `lockin` repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
5. Click **Deploy**. Vercel will run `npm run build` and provision global CDN edge routes.

---

## 9. Quality Assurance Summary

- **Production Build:** Passes with Exit Code 0 across all 16 routes.
- **TypeScript:** Strict type validation passing with 0 errors.
- **Design System Fidelity:** 1:1 match with provided screens (palette, bento cards, typography, cosmic stairs visual).
- **Graceful Fallbacks:** Interactive demo session provided when Supabase env vars are empty, with zero localStorage fake persistence compromises.
- **Content Integrity:** All external resources link to official first-party documentation and accredited university courses.
