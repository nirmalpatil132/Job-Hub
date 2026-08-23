# JobHub — Complete Job Portal System

> **Discover Opportunities. Build Your Future.**
> 
> *A Modern, Full-Stack Job Portal & Recruitment Platform — 1st-Year BCA Academic Project*

---

## 🌐 Live Website & Links

- 🌐 **Live Website (GitHub Pages)**: [https://nirmalpatil132.github.io/Job-Hub/](https://nirmalpatil132.github.io/Job-Hub/)
- 💻 **GitHub Repository**: [https://github.com/nirmalpatil132/Job-Hub](https://github.com/nirmalpatil132/Job-Hub)

---

## 🚀 Project Overview

**JobHub** is a comprehensive, student-friendly web application built to connect ambitious job seekers, students, and freshers with leading tech employers and talent acquisition teams.

Designed following modern SaaS UI/UX principles, clean architecture, and responsive layouts, JobHub provides a complete recruitment workflow from opportunity discovery and applicant screening to real-time status updates and platform administration.

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

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Static Export to GitHub Pages)
- **Frontend Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with centralized design tokens & [Poppins](https://fonts.google.com/specimen/Poppins) typography
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data & State**: Client-Side Reactive Data Store (Runs 100% zero-configuration in the browser with `localStorage` persistence)
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
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions workflow for GitHub Pages
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
│   ├── data/
│   │   └── mockData.ts           # Rich seed dataset (36 jobs, 8 companies, 22 profiles, 20+ applications)
│   ├── context/
│   │   ├── JobHubContext.tsx     # Master reactive state provider
│   │   └── ToastContext.tsx      # Animated toast notification manager
│   └── utils/
│       └── index.ts              # Currency formatters, date helpers, profile completion
├── public/                       # Static assets
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

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 GitHub Pages Deployment Instructions

This project is configured for static export to **GitHub Pages**:

1. Enable GitHub Pages in your repository settings:
   - Go to **Settings → Pages** on your GitHub repository.
   - Under **Build and deployment → Source**, select **GitHub Actions**.
2. Push your changes to the `main` branch:
   ```bash
   git add .
   git commit -m "feat: configure static export for GitHub Pages deployment"
   git push origin main
   ```
3. GitHub Actions will automatically build and publish your static website to:
   **[https://nirmalpatil132.github.io/Job-Hub/](https://nirmalpatil132.github.io/Job-Hub/)**

---

## 🎓 Academic Notice
This project is developed as a **1st-Year BCA Academic Project** demonstrating full-stack web engineering, client-side state management, responsive UI design, and role-based access control.
