export type UserRole = "job_seeker" | "recruiter" | "admin";

export type JobType = "Full Time" | "Part Time" | "Internship" | "Contract";
export type WorkMode = "On-site" | "Hybrid" | "Remote";
export type JobStatus = "Active" | "Closed" | "Draft";

export type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Selected"
  | "Rejected";

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  headline?: string;
  bio?: string;
  role: UserRole;
  skills?: string[];
  resume_name?: string;
  resume_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  recruiter_id: string;
  name: string;
  logo_url: string;
  industry: string;
  location: string;
  website?: string;
  description: string;
  company_size?: string;
  created_at: string;
  updated_at: string;
  open_jobs_count?: number;
}

export interface Job {
  id: string;
  recruiter_id: string;
  company_id: string;
  company_name?: string;
  company_logo?: string;
  company_location?: string;
  title: string;
  category: string;
  job_type: JobType;
  work_mode: WorkMode;
  location: string;
  salary_min: number;
  salary_max: number;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  status: JobStatus;
  created_at: string;
  updated_at: string;
  applicants_count?: number;
}

export interface Application {
  id: string;
  job_id: string;
  job_title?: string;
  company_name?: string;
  company_logo?: string;
  applicant_id: string;
  applicant_name?: string;
  applicant_email?: string;
  applicant_phone?: string;
  applicant_skills?: string[];
  applicant_headline?: string;
  resume_url?: string;
  cover_letter?: string;
  phone?: string;
  status: ApplicationStatus;
  applied_at: string;
  updated_at: string;
}

export interface SavedJob {
  id: string;
  user_id: string;
  job_id: string;
  created_at: string;
  job?: Job;
}

export interface Education {
  id: string;
  user_id: string;
  degree: string;
  institution: string;
  graduation_year: number;
  description?: string;
  created_at?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "status_change";
  is_read: boolean;
  created_at: string;
}

export interface FilterState {
  keyword: string;
  location: string;
  category: string;
  job_type: string[];
  work_mode: string[];
  experience: string[];
  salary_min: number;
  date_posted: string;
  sort_by: "recent" | "salary_asc" | "salary_desc";
}
