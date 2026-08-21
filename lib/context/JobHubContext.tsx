"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  UserProfile,
  Company,
  Job,
  Application,
  SavedJob,
  Education,
  Notification,
  UserRole,
  ApplicationStatus,
  FilterState,
} from "@/types";
import {
  INITIAL_PROFILES,
  INITIAL_COMPANIES,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_SAVED_JOBS,
  INITIAL_EDUCATION,
  INITIAL_NOTIFICATIONS,
} from "@/lib/data/mockData";
import { useToast } from "./ToastContext";

interface JobHubContextType {
  // Auth state
  currentUser: UserProfile | null;
  currentRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  register: (name: string, email: string, role: UserRole, phone?: string) => boolean;
  logout: () => void;
  switchDemoRole: (role: UserRole, userId?: string) => void;

  // Data & State
  profiles: UserProfile[];
  companies: Company[];
  jobs: Job[];
  applications: Application[];
  savedJobs: SavedJob[];
  education: Education[];
  notifications: Notification[];

  // Jobs Actions
  getFilteredJobs: (filters: Partial<FilterState>) => Job[];
  getJobById: (id: string) => Job | undefined;
  createJob: (jobData: Omit<Job, "id" | "created_at" | "updated_at" | "applicants_count">) => Job;
  updateJob: (id: string, jobData: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  toggleJobStatus: (id: string) => void;

  // Company Actions
  getCompanyById: (id: string) => Company | undefined;
  updateCompany: (id: string, data: Partial<Company>) => void;

  // Applications Actions
  applyForJob: (jobId: string, coverLetter: string, phone: string, resumeUrl?: string) => { success: boolean; message: string };
  hasApplied: (jobId: string) => boolean;
  updateApplicationStatus: (applicationId: string, newStatus: ApplicationStatus) => void;
  getApplicantApplications: (applicantId?: string) => Application[];
  getRecruiterApplications: (recruiterId?: string) => Application[];

  // Saved Jobs Actions
  toggleSaveJob: (jobId: string) => boolean;
  isJobSaved: (jobId: string) => boolean;

  // Profile Actions
  updateProfile: (profileData: Partial<UserProfile>) => void;
  addEducation: (edu: Omit<Education, "id">) => void;
  deleteEducation: (id: string) => void;
  toggleUserStatus: (userId: string) => void;

  // Notifications Actions
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotification: (id: string) => void;

  // Platform Metrics
  stats: {
    totalJobs: number;
    activeJobs: number;
    totalCompanies: number;
    totalJobSeekers: number;
    totalRecruiters: number;
    totalApplications: number;
  };
}

const JobHubContext = createContext<JobHubContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER: "jobhub_current_user",
  PROFILES: "jobhub_profiles_v1",
  COMPANIES: "jobhub_companies_v1",
  JOBS: "jobhub_jobs_v1",
  APPLICATIONS: "jobhub_applications_v1",
  SAVED_JOBS: "jobhub_saved_jobs_v1",
  EDUCATION: "jobhub_education_v1",
  NOTIFICATIONS: "jobhub_notifications_v1",
};

export function JobHubProvider({ children }: { children: React.ReactNode }) {
  const { success, error, info } = useToast();

  // Master State Initializers
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILES);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_PROFILES;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    // Default to Rahul Sharma (Job Seeker)
    return INITIAL_PROFILES.find((p) => p.user_id === "user-1") || INITIAL_PROFILES[3];
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPANIES);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_COMPANIES;
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_JOBS;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_APPLICATIONS;
  });

  const [savedJobs, setSavedJobs] = useState<SavedJob[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_SAVED_JOBS;
  });

  const [education, setEducation] = useState<Education[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.EDUCATION);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_EDUCATION;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // LocalStorage Persistence Effects
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    }
  }, [profiles]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
    }
  }, [companies]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    }
  }, [jobs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    }
  }, [applications]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(savedJobs));
    }
  }, [savedJobs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(education));
    }
  }, [education]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    }
  }, [notifications]);

  // Auth Operations
  const login = useCallback(
    (email: string, preferredRole?: UserRole) => {
      const matched = profiles.find(
        (p) => p.email.toLowerCase() === email.toLowerCase() && (!preferredRole || p.role === preferredRole)
      );

      if (matched) {
        setCurrentUser(matched);
        success("Welcome back!", `Logged in as ${matched.full_name} (${matched.role})`);
        return true;
      }

      // If user not in initial seed, create demo profile
      const newProfile: UserProfile = {
        id: `prof-${Date.now()}`,
        user_id: `user-${Date.now()}`,
        full_name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        email,
        role: preferredRole || "job_seeker",
        location: "Pune, Maharashtra",
        headline: preferredRole === "recruiter" ? "Hiring Manager" : "Software Professional",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setProfiles((prev) => [...prev, newProfile]);
      setCurrentUser(newProfile);
      success("Account ready!", `Signed in as ${newProfile.full_name}`);
      return true;
    },
    [profiles, success]
  );

  const register = useCallback(
    (name: string, email: string, role: UserRole, phone?: string) => {
      const existing = profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        error("Email already registered", "Please login with your existing account.");
        return false;
      }

      const newId = `user-${Date.now()}`;
      const newProfile: UserProfile = {
        id: `prof-${Date.now()}`,
        user_id: newId,
        full_name: name,
        email,
        phone: phone || "+91 98765 00000",
        location: "Pune, Maharashtra",
        headline: role === "recruiter" ? "Talent Acquisition Specialist" : "Aspiring Software Engineer",
        role,
        skills: role === "job_seeker" ? ["JavaScript", "React", "Python", "SQL"] : undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // If recruiter, also auto-create associated company entry
      if (role === "recruiter") {
        const companyName = `${name.split(" ")[0]} Innovations`;
        const newCompany: Company = {
          id: `comp-${Date.now()}`,
          recruiter_id: newId,
          name: companyName,
          logo_url: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80",
          industry: "IT & Software",
          location: "Pune, Maharashtra",
          website: `https://${companyName.toLowerCase().replace(/\s+/g, "")}.com`,
          description: `${companyName} is pioneering agile technology solutions and modern digital products.`,
          company_size: "11-50 employees",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          open_jobs_count: 0,
        };
        setCompanies((prev) => [...prev, newCompany]);
      }

      setProfiles((prev) => [...prev, newProfile]);
      setCurrentUser(newProfile);
      success("Registration successful!", `Welcome to JobHub, ${name}!`);
      return true;
    },
    [profiles, success, error]
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    info("Logged out", "You have been signed out safely.");
  }, [info]);

  const switchDemoRole = useCallback(
    (role: UserRole, userId?: string) => {
      let target: UserProfile | undefined;
      if (userId) {
        target = profiles.find((p) => p.user_id === userId);
      } else {
        target = profiles.find((p) => p.role === role);
      }

      if (target) {
        setCurrentUser(target);
        success("Role Switched", `Now viewing as ${target.full_name} (${target.role})`);
      }
    },
    [profiles, success]
  );

  // Job Search and Filtering Engine
  const getFilteredJobs = useCallback(
    (filters: Partial<FilterState>) => {
      return jobs.filter((job) => {
        // Keyword match
        if (filters.keyword && filters.keyword.trim() !== "") {
          const kw = filters.keyword.toLowerCase().trim();
          const matchTitle = job.title.toLowerCase().includes(kw);
          const matchCompany = (job.company_name || "").toLowerCase().includes(kw);
          const matchSkills = job.skills.some((s) => s.toLowerCase().includes(kw));
          const matchDesc = job.description.toLowerCase().includes(kw);
          if (!matchTitle && !matchCompany && !matchSkills && !matchDesc) return false;
        }

        // Location match
        if (filters.location && filters.location.trim() !== "") {
          const loc = filters.location.toLowerCase().trim();
          const matchLoc = job.location.toLowerCase().includes(loc);
          const matchCompanyLoc = (job.company_location || "").toLowerCase().includes(loc);
          if (!matchLoc && !matchCompanyLoc) return false;
        }

        // Category match
        if (filters.category && filters.category !== "All Categories" && filters.category !== "") {
          if (job.category.toLowerCase() !== filters.category.toLowerCase()) return false;
        }

        // Job Type match
        if (filters.job_type && filters.job_type.length > 0) {
          if (!filters.job_type.includes(job.job_type)) return false;
        }

        // Work Mode match
        if (filters.work_mode && filters.work_mode.length > 0) {
          if (!filters.work_mode.includes(job.work_mode)) return false;
        }

        // Experience match
        if (filters.experience && filters.experience.length > 0) {
          if (!filters.experience.includes(job.experience)) return false;
        }

        // Salary match
        if (filters.salary_min && filters.salary_min > 0) {
          if (job.salary_max < filters.salary_min) return false;
        }

        // Date Posted match
        if (filters.date_posted && filters.date_posted !== "any") {
          const jobDate = new Date(job.created_at).getTime();
          const now = new Date().getTime();
          const diffDays = (now - jobDate) / (1000 * 3600 * 24);

          if (filters.date_posted === "today" && diffDays > 1) return false;
          if (filters.date_posted === "3days" && diffDays > 3) return false;
          if (filters.date_posted === "7days" && diffDays > 7) return false;
          if (filters.date_posted === "30days" && diffDays > 30) return false;
        }

        return true;
      }).sort((a, b) => {
        if (filters.sort_by === "salary_desc") {
          return b.salary_max - a.salary_max;
        }
        if (filters.sort_by === "salary_asc") {
          return a.salary_min - b.salary_min;
        }
        // Default: most recent
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    },
    [jobs]
  );

  const getJobById = useCallback((id: string) => jobs.find((j) => j.id === id), [jobs]);

  const createJob = useCallback(
    (jobData: Omit<Job, "id" | "created_at" | "updated_at" | "applicants_count">) => {
      const newJob: Job = {
        ...jobData,
        id: `job-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        applicants_count: 0,
      };

      setJobs((prev) => [newJob, ...prev]);
      success("Job Published!", `"${newJob.title}" is now live.`);
      return newJob;
    },
    [success]
  );

  const updateJob = useCallback(
    (id: string, jobData: Partial<Job>) => {
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, ...jobData, updated_at: new Date().toISOString() } : j))
      );
      success("Job Updated", "Changes have been saved successfully.");
    },
    [success]
  );

  const deleteJob = useCallback(
    (id: string) => {
      setJobs((prev) => prev.filter((j) => j.id !== id));
      setApplications((prev) => prev.filter((a) => a.job_id !== id));
      setSavedJobs((prev) => prev.filter((s) => s.job_id !== id));
      success("Job Removed", "The job listing was removed.");
    },
    [success]
  );

  const toggleJobStatus = useCallback(
    (id: string) => {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === id
            ? { ...j, status: j.status === "Active" ? "Closed" : "Active", updated_at: new Date().toISOString() }
            : j
        )
      );
      info("Status Toggled", "Job listing status was updated.");
    },
    [info]
  );

  // Company Actions
  const getCompanyById = useCallback((id: string) => companies.find((c) => c.id === id), [companies]);

  const updateCompany = useCallback(
    (id: string, data: Partial<Company>) => {
      setCompanies((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...data, updated_at: new Date().toISOString() } : c))
      );
      success("Company Updated", "Company profile was saved.");
    },
    [success]
  );

  // Applications
  const applyForJob = useCallback(
    (jobId: string, coverLetter: string, phone: string, resumeUrl?: string) => {
      if (!currentUser) {
        error("Login Required", "Please login to submit your application.");
        return { success: false, message: "Login required" };
      }

      // Duplicate prevention
      const alreadyApplied = applications.some(
        (a) => a.job_id === jobId && a.applicant_id === currentUser.user_id
      );
      if (alreadyApplied) {
        error("Already Applied", "You have already applied for this job.");
        return { success: false, message: "Already applied" };
      }

      const targetJob = jobs.find((j) => j.id === jobId);
      if (!targetJob) {
        error("Job Not Found", "This position is no longer available.");
        return { success: false, message: "Job not found" };
      }

      const newApp: Application = {
        id: `app-${Date.now()}`,
        job_id: jobId,
        job_title: targetJob.title,
        company_name: targetJob.company_name || "Company",
        company_logo: targetJob.company_logo,
        applicant_id: currentUser.user_id,
        applicant_name: currentUser.full_name,
        applicant_email: currentUser.email,
        applicant_phone: phone || currentUser.phone,
        applicant_skills: currentUser.skills || [],
        applicant_headline: currentUser.headline,
        resume_url: resumeUrl || currentUser.resume_url || "/resumes/sample_resume.pdf",
        cover_letter: coverLetter,
        phone: phone || currentUser.phone,
        status: "Applied",
        applied_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setApplications((prev) => [newApp, ...prev]);

      // Increment applicants count on job
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, applicants_count: (j.applicants_count || 0) + 1 } : j))
      );

      // Create notification for recruiter
      const recruiterNotif: Notification = {
        id: `notif-${Date.now()}`,
        user_id: targetJob.recruiter_id,
        title: "New Application Received",
        message: `${currentUser.full_name} submitted an application for "${targetJob.title}".`,
        type: "info",
        is_read: false,
        created_at: new Date().toISOString(),
      };
      setNotifications((prev) => [recruiterNotif, ...prev]);

      // Create confirmation notification for applicant
      const seekerNotif: Notification = {
        id: `notif-${Date.now() + 1}`,
        user_id: currentUser.user_id,
        title: "Application Submitted Successfully",
        message: `Your application for "${targetJob.title}" at ${targetJob.company_name} was sent!`,
        type: "success",
        is_read: false,
        created_at: new Date().toISOString(),
      };
      setNotifications((prev) => [seekerNotif, ...prev]);

      success("Application Submitted!", "Your application has been received by the recruiter.");
      return { success: true, message: "Application submitted" };
    },
    [currentUser, applications, jobs, success, error]
  );

  const hasApplied = useCallback(
    (jobId: string) => {
      if (!currentUser) return false;
      return applications.some((a) => a.job_id === jobId && a.applicant_id === currentUser.user_id);
    },
    [currentUser, applications]
  );

  const updateApplicationStatus = useCallback(
    (applicationId: string, newStatus: ApplicationStatus) => {
      const targetApp = applications.find((a) => a.id === applicationId);
      if (!targetApp) return;

      setApplications((prev) =>
        prev.map((a) =>
          a.id === applicationId ? { ...a, status: newStatus, updated_at: new Date().toISOString() } : a
        )
      );

      // Create high-priority notification for the applicant
      const statusNotif: Notification = {
        id: `notif-${Date.now()}`,
        user_id: targetApp.applicant_id,
        title: `Application Status: ${newStatus}`,
        message: `${targetApp.company_name || "The employer"} updated your application status for "${
          targetApp.job_title
        }" to ${newStatus}.`,
        type: "status_change",
        is_read: false,
        created_at: new Date().toISOString(),
      };

      setNotifications((prev) => [statusNotif, ...prev]);
      success("Status Updated", `Candidate marked as ${newStatus}`);
    },
    [applications, success]
  );

  const getApplicantApplications = useCallback(
    (applicantId?: string) => {
      const uid = applicantId || currentUser?.user_id;
      if (!uid) return [];
      return applications.filter((a) => a.applicant_id === uid);
    },
    [currentUser, applications]
  );

  const getRecruiterApplications = useCallback(
    (recruiterId?: string) => {
      const rid = recruiterId || currentUser?.user_id;
      if (!rid) return [];
      const recruiterJobIds = jobs.filter((j) => j.recruiter_id === rid).map((j) => j.id);
      return applications.filter((a) => recruiterJobIds.includes(a.job_id));
    },
    [currentUser, jobs, applications]
  );

  // Saved Jobs
  const toggleSaveJob = useCallback(
    (jobId: string) => {
      if (!currentUser) {
        error("Login Required", "Please login to bookmark jobs.");
        return false;
      }

      const existingIndex = savedJobs.findIndex(
        (s) => s.job_id === jobId && s.user_id === currentUser.user_id
      );

      if (existingIndex >= 0) {
        setSavedJobs((prev) => prev.filter((_, idx) => idx !== existingIndex));
        info("Job Removed", "Removed from your saved jobs.");
        return false;
      } else {
        const newSave: SavedJob = {
          id: `save-${Date.now()}`,
          user_id: currentUser.user_id,
          job_id: jobId,
          created_at: new Date().toISOString(),
        };
        setSavedJobs((prev) => [...prev, newSave]);
        success("Job Saved!", "Added to your saved jobs list.");
        return true;
      }
    },
    [currentUser, savedJobs, success, info, error]
  );

  const isJobSaved = useCallback(
    (jobId: string) => {
      if (!currentUser) return false;
      return savedJobs.some((s) => s.job_id === jobId && s.user_id === currentUser.user_id);
    },
    [currentUser, savedJobs]
  );

  // Profile Management
  const updateProfile = useCallback(
    (profileData: Partial<UserProfile>) => {
      if (!currentUser) return;
      const updated = { ...currentUser, ...profileData, updated_at: new Date().toISOString() };
      setCurrentUser(updated);
      setProfiles((prev) => prev.map((p) => (p.user_id === currentUser.user_id ? updated : p)));
      success("Profile Updated", "Your profile details have been saved.");
    },
    [currentUser, success]
  );

  const addEducation = useCallback(
    (eduData: Omit<Education, "id">) => {
      const newEdu: Education = {
        ...eduData,
        id: `edu-${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      setEducation((prev) => [...prev, newEdu]);
      success("Education Added", "Academic record saved to your profile.");
    },
    [success]
  );

  const deleteEducation = useCallback(
    (id: string) => {
      setEducation((prev) => prev.filter((e) => e.id !== id));
      info("Education Removed", "Record removed from your profile.");
    },
    [info]
  );

  const toggleUserStatus = useCallback(
    (userId: string) => {
      info("User Updated", `Status updated for user.`);
    },
    [info]
  );

  // Notifications
  const unreadNotificationsCount = currentUser
    ? notifications.filter((n) => n.user_id === currentUser.user_id && !n.is_read).length
    : 0;

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    if (!currentUser) return;
    setNotifications((prev) =>
      prev.map((n) => (n.user_id === currentUser.user_id ? { ...n, is_read: true } : n))
    );
    success("All Caught Up", "All notifications marked as read.");
  }, [currentUser, success]);

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Platform Metrics
  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter((j) => j.status === "Active").length,
    totalCompanies: companies.length,
    totalJobSeekers: profiles.filter((p) => p.role === "job_seeker").length,
    totalRecruiters: profiles.filter((p) => p.role === "recruiter").length,
    totalApplications: applications.length,
  };

  return (
    <JobHubContext.Provider
      value={{
        currentUser,
        currentRole: currentUser?.role || "job_seeker",
        isAuthenticated: Boolean(currentUser),
        login,
        register,
        logout,
        switchDemoRole,
        profiles,
        companies,
        jobs,
        applications,
        savedJobs,
        education,
        notifications,
        getFilteredJobs,
        getJobById,
        createJob,
        updateJob,
        deleteJob,
        toggleJobStatus,
        getCompanyById,
        updateCompany,
        applyForJob,
        hasApplied,
        updateApplicationStatus,
        getApplicantApplications,
        getRecruiterApplications,
        toggleSaveJob,
        isJobSaved,
        updateProfile,
        addEducation,
        deleteEducation,
        toggleUserStatus,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotification,
        stats,
      }}
    >
      {children}
    </JobHubContext.Provider>
  );
}

export function useJobHub() {
  const context = useContext(JobHubContext);
  if (!context) {
    throw new Error("useJobHub must be used within a JobHubProvider");
  }
  return context;
}
