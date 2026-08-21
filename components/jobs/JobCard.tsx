"use client";

import React from "react";
import Link from "next/link";
import { Job } from "@/types";
import { useJobHub } from "@/lib/context/JobHubContext";
import { formatSalary, formatRelativeDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { Bookmark, MapPin, Building, Briefcase, IndianRupee, Clock, ArrowRight } from "lucide-react";

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export function JobCard({ job, featured = false }: JobCardProps) {
  const { isJobSaved, toggleSaveJob, hasApplied } = useJobHub();
  const saved = isJobSaved(job.id);
  const applied = hasApplied(job.id);

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl bg-white p-6 border transition-all duration-300 ${
        featured
          ? "border-indigo-200/80 shadow-card hover:shadow-cardHover hover:border-primary-400"
          : "border-borderLine hover:border-indigo-300 hover:shadow-cardHover"
      }`}
    >
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-200">
              <img
                src={job.company_logo || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150"}
                alt={job.company_name || "Company"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <Link
                href={`/companies/${job.company_id}`}
                className="text-xs font-semibold text-subText hover:text-primary-600 transition flex items-center gap-1"
              >
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {job.company_name}
              </Link>
              <Link href={`/jobs/${job.id}`}>
                <h3 className="text-base sm:text-lg font-bold text-mainText group-hover:text-primary-600 transition-colors line-clamp-1 mt-0.5">
                  {job.title}
                </h3>
              </Link>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaveJob(job.id);
            }}
            className={`p-2 rounded-xl border transition-all ${
              saved
                ? "bg-primary-50 border-primary-300 text-primary-600 shadow-sm"
                : "border-slate-200 text-slate-400 hover:text-primary-600 hover:border-primary-200 hover:bg-slate-50"
            }`}
            title={saved ? "Remove from saved" : "Save job"}
            aria-label="Save job"
          >
            <Bookmark className={`w-4 h-4 ${saved ? "fill-primary-600" : ""}`} />
          </button>
        </div>

        {/* Location & Experience Meta */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-4 text-xs text-subText">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            {job.experience}
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-800">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
            {formatSalary(job.salary_min, job.salary_max, job.job_type)}
          </span>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <StatusBadge status={job.job_type} size="sm" />
          <StatusBadge status={job.work_mode} size="sm" />
          {applied && (
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              Applied ✓
            </span>
          )}
        </div>

        {/* Skills Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100/80 text-slate-600"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2 py-1 text-[11px] font-medium text-slate-400">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Footer Row */}
      <div className="flex items-center justify-between gap-3 pt-5 mt-5 border-t border-slate-100">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {formatRelativeDate(job.created_at)}
        </span>

        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-600 hover:text-white transition-all duration-200"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
