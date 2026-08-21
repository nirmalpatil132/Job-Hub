# JobHub — Complete Job Portal System

> **Discover Opportunities. Build Your Future.**
> 
> *A Modern, Full-Stack Job Portal & Recruitment Platform — 1st-Year BCA Academic Project*

---

## 🚀 Project Overview

**JobHub** is a comprehensive, production-grade web application built to connect ambitious job seekers, students, and freshers with leading tech employers and talent acquisition teams. 

Designed following modern SaaS UI/UX principles, clean architecture, and responsive layouts, JobHub provides a complete recruitment workflow from opportunity discovery and applicant screening to real-time status updates and platform administration.

- **GitHub Repository**: [https://github.com/nirmalpatil132/Job-Hub](https://github.com/nirmalpatil132/Job-Hub)

---

## 👥 Triple-Role User Architecture

JobHub features three distinct user roles with tailored interfaces and capabilities:

### 1. 🎓 Job Seeker
- **Discovery & Search**: Full-text search across job titles, skills, descriptions, and Indian cities.
- **Faceted Filters**: Multi-select filtering by category, job type, work mode, experience level, salary range, and date posted.
- **Saved Jobs**: Bookmark jobs to review and apply later.
- **1-Click Application Flow**: Submit tailored applications with phone, resume upload, and cover letters.
- **Live Status Tracker**: Visual 5-step pipeline (*Applied → Under Review → Shortlisted → Interview → Selected / Rejected*).
- **Profile & Education CRUD**: Manage personal information, technical skills tags, educational history, and resume documents.
- **Notifications**: Instant alerts on candidate status updates.

### 2. 💼 Recruiter / Employer
- **Company Profile Management**: Customize brand logo, description, industry, location, and website.
- **Job Posting Management**: Multi-step job authoring form with responsibilities, requirements, salary range, and tags.
- **Manage Posted Listings**: Toggle statuses (*Active / Closed*), edit, view public post, or delete jobs.
- **Applicant Screening**: Review candidate profiles, credentials, cover letters, and resumes.
- **Hiring Stage Updates**: Transition candidate status with real-time automated applicant notifications.
- **Recruiter Analytics**: Track total jobs, active vacancies, applicant counts, and shortlisted talent.

### 3. 🛡️ Administrator
- **Platform Analytics**: High-level platform metrics covering users, recruiters, verified companies, jobs, and applications.
- **User Governance**: Audit user directory, inspect roles, and activate/deactivate accounts.
- **Job Moderation**: Verify job compliance, toggle active listings, or remove obsolete postings.
- **Application Monitoring**: Audit system-wide job submissions across all employers.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & Client Hooks)
- **Frontend Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with centralized design tokens & [Poppins](https://fonts.google.com/specimen/Poppins) typography
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/) PostgreSQL + Row Level Security (RLS) policies
- **Storage Layer**: Hybrid Reactive Data Store (Runs zero-configuration out-of-the-box locally and on Vercel preview, seamlessly connects to Supabase when environment keys are provided)
- **Micro-Interactions**: Canvas-Confetti celebratory animations

---

## 🎨 Design System & Color Palette

| Token | Hex Code | Purpose |
|---|---|---|
| **Primary (Indigo)** | `#4F46E5` | Primary CTA, brand highlights, active states |
| **Secondary (Purple)** | `#7C3AED` | Secondary accents, recruiter badges |
| **Accent (Cyan)** | `#06B6D4` | Focus rings, category highlights |
| **Success** | `#16A34A` | Selected / Active badges |
| **Warning** | `#F59E0B` | Under review badges |
| **Error / Danger** | `#DC2626` | Rejected / Destructive actions |
| **Background** | `#F8FAFC` | Main application background |
| **Main Text** | `#0F172A` | Primary typography |
| **Secondary Text** | `#64748B` | Subheadings & metadata |
| **Border** | `#E2E8F0` | Card borders & dividers |

---

## 📁 Project Directory Structure

```
jobhub/
├── app/
│   ├── layout.tsx                # Root layout (Poppins font, Providers, Navbar, Footer)
│   ├── globals.css               # Design system baseline & scrollbars
│   ├── page.tsx                  # Homepage (Hero, Search, Categories, Featured Jobs, How It Works, Stats, CTA)
│   ├── jobs/
│   │   ├── page.tsx              # Job Search & Listings (2-column layout, filters, URL params sync)
│   │   └── [id]/page.tsx         # Job Details (Full specs, apply modal, save toggle, similar jobs)
│   ├── companies/
│   │   ├── page.tsx              # Company Directory (Search & industry filters)
│   │   └── [id]/page.tsx         # Company Profile & active openings
│   ├── about/page.tsx            # About JobHub & Academic BCA project overview
│   ├── contact/page.tsx          # Contact & Inquiry form with toast feedback
│   ├── login/page.tsx            # Login with 1-Click Demo accounts
│   ├── register/page.tsx         # Register with role selector (Seeker / Recruiter)
│   ├── dashboard/                # Job Seeker Portal
│   │   ├── layout.tsx            # Seeker dashboard layout
│   │   ├── page.tsx              # Overview (Stats, profile completion, recent applications)
│   │   ├── applications/page.tsx # Applications tracker with visual progress steps
│   │   ├── saved/page.tsx        # Saved jobs list with quick apply
│   │   ├── profile/page.tsx      # Profile, Skills tags, Education CRUD, Resume info
│   │   └── notifications/page.tsx# Notification center with mark-as-read
│   ├── recruiter/                # Recruiter Portal
│   │   ├── layout.tsx            # Recruiter dashboard layout
│   │   ├── page.tsx              # Recruiter overview & stats
│   │   ├── company/page.tsx      # Manage company profile
│   │   ├── jobs/
│   │   │   ├── page.tsx          # Manage posted jobs table (status toggle, edit, delete)
│   │   │   ├── new/page.tsx      # Post a new job (multi-field structured form)
│   │   │   └── [id]/
│   │   │       ├── edit/page.tsx # Edit job
│   │   │       └── applicants/page.tsx # Review applicants & update hiring stages
│   └── admin/                    # Admin Portal
│       ├── layout.tsx            # Admin dashboard layout
│       ├── page.tsx              # Platform metrics & overview
│       ├── users/page.tsx        # User governance & status toggle
│       ├── jobs/page.tsx         # Job moderation
│       └── applications/page.tsx # System-wide application audit
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Responsive navbar with user profile dropdown & mobile drawer
│   │   ├── Footer.tsx            # 4-column footer
│   │   └── DashboardSidebar.tsx  # Universal dashboard sidebar
│   ├── ui/
│   │   └── Badge.tsx             # StatusBadge for job types and application stages
│   ├── jobs/
│   │   ├── JobCard.tsx           # Premium Job Card with badges & bookmark toggle
│   │   ├── JobFilterPanel.tsx    # Multi-faceted filter panel with checkboxes & range slider
│   │   ├── ApplyModal.tsx        # Application submission modal with validation
│   │   └── ApplicationTracker.tsx# Visual multi-step progress pipeline
│   └── companies/
│       └── CompanyCard.tsx       # Company showcase card
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Supabase browser client
│   ├── data/
│   │   └── mockData.ts           # Rich seed dataset (36 jobs, 8 companies, 22 profiles, 20+ applications)
│   ├── context/
│   │   ├── JobHubContext.tsx     # Master reactive state provider
│   │   └── ToastContext.tsx      # Animated toast notification manager
│   └── utils/
│       └── index.ts              # Currency formatters, date helpers, profile completion
├── public/                       # Static assets
├── supabase/
│   ├── migrations/
│   │   └── 01_initial_schema.sql # Complete PostgreSQL DDL with RLS policies & triggers
│   └── seed/
│       └── seed.sql              # SQL seed script for database initialization
├── .env.example
├── README.md
├── package.json
└── tsconfig.json
```

---

## 🔑 Demo Accounts for Evaluation

For rapid evaluation and testing during demonstrations, use the quick 1-click login buttons on `/login` or enter the demo credentials:

| Role | Name | Email | Password | Access Area |
|---|---|---|---|---|
| **Job Seeker** | Rahul Sharma | `rahul.sharma@example.com` | `password123` | `/dashboard` |
| **Recruiter** | Priya Nair | `priya.nair@technova.com` | `password123` | `/recruiter` |
| **Administrator** | Vikram Malhotra | `admin@jobhub.com` | `password123` | `/admin` |

*(You can also register any new Job Seeker or Recruiter account via `/register`)*

---

## ⚙️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/nirmalpatil132/Job-Hub.git
cd Job-Hub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file by copying `.env.example`:
```bash
cp .env.example .env.local
```

Configure your Supabase credentials (optional for initial local evaluation):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase PostgreSQL Setup

To set up a live Supabase PostgreSQL database:

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase project dashboard.
3. Open `supabase/migrations/01_initial_schema.sql` and run the script to create tables, indexes, triggers, and Row Level Security policies.
4. Run `supabase/seed/seed.sql` to populate initial demo records.
5. Copy your Project URL and Anon API key into `.env.local` and in Vercel Environment Variables.

---

## 🚀 Deployment to Vercel

1. Push your repository to **GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete JobHub job portal"
   git push origin main
   ```
2. Log into [vercel.com](https://vercel.com) and click **"Add New" → "Project"**.
3. Import your `nirmalpatil132/Job-Hub` repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**. Vercel will build and publish your project with an active production URL.

---

## 🎓 Academic Notice
This project is developed as a **1st-Year BCA Academic Project** demonstrating full-stack web engineering, database architecture, responsive UI design, and role-based access control.
