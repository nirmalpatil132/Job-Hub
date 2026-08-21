import React from "react";
import { ApplicationStatus, JobType, WorkMode } from "@/types";

interface StatusBadgeProps {
  status: ApplicationStatus | JobType | WorkMode | string;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm";

  // Application Status Styles
  if (status === "Applied") {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
        Applied
      </span>
    );
  }

  if (status === "Under Review") {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>
        Under Review
      </span>
    );
  }

  if (status === "Shortlisted") {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-purple-50 text-purple-700 border border-purple-200/60 ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5"></span>
        Shortlisted
      </span>
    );
  }

  if (status === "Interview") {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-1.5"></span>
        Interview Scheduled
      </span>
    );
  }

  if (status === "Selected") {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
        Selected 🎉
      </span>
    );
  }

  if (status === "Rejected") {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-rose-50 text-rose-700 border border-rose-200/60 ${sizeClasses}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
        Rejected
      </span>
    );
  }

  // Work Mode Badges
  if (status === "Remote") {
    return (
      <span className={`inline-flex items-center font-medium rounded-lg bg-teal-50 text-teal-700 border border-teal-200/60 ${sizeClasses}`}>
        🌐 Remote
      </span>
    );
  }
  if (status === "Hybrid") {
    return (
      <span className={`inline-flex items-center font-medium rounded-lg bg-sky-50 text-sky-700 border border-sky-200/60 ${sizeClasses}`}>
        🏢 Hybrid
      </span>
    );
  }
  if (status === "On-site") {
    return (
      <span className={`inline-flex items-center font-medium rounded-lg bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}>
        📍 On-site
      </span>
    );
  }

  // Job Type Badges
  if (status === "Internship") {
    return (
      <span className={`inline-flex items-center font-medium rounded-lg bg-amber-50 text-amber-800 border border-amber-200/80 ${sizeClasses}`}>
        🎓 Internship
      </span>
    );
  }
  if (status === "Full Time") {
    return (
      <span className={`inline-flex items-center font-medium rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/60 ${sizeClasses}`}>
        💼 Full Time
      </span>
    );
  }
  if (status === "Part Time") {
    return (
      <span className={`inline-flex items-center font-medium rounded-lg bg-purple-50 text-purple-700 border border-purple-200/60 ${sizeClasses}`}>
        ⏱️ Part Time
      </span>
    );
  }
  if (status === "Contract") {
    return (
      <span className={`inline-flex items-center font-medium rounded-lg bg-orange-50 text-orange-700 border border-orange-200/60 ${sizeClasses}`}>
        📜 Contract
      </span>
    );
  }

  // Default Generic Badge
  return (
    <span className={`inline-flex items-center font-medium rounded-lg bg-slate-100 text-slate-700 ${sizeClasses}`}>
      {status}
    </span>
  );
}
