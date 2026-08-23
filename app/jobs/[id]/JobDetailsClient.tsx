"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJobHub } from "@/lib/context/JobHubContext";
import { StatusBadge } from "@/components/ui/Badge";
import { ApplyModal } from "@/components/jobs/ApplyModal";
import { JobCard } from "@/components/jobs/JobCard";
import { formatSalary, formatRelativeDate } from "@/lib/utils";
import {
  Building2,
  MapPin,
  Briefcase,
  IndianRupee,
  Calendar,
  Bookmark,
  Send,
  CheckCircle2,
  Share2,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export function JobDetailsClient({ id }: { id: string }) {
  const router = useRouter();
  const { getJobById, jobs, isJobSaved, toggleSaveJob, hasApplied } = useJobHub();

  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
          <Briefcase className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-mainText">Job Not Found</h2>
        <p className="text-subText text-sm">
          The job listing you are looking for may have expired or been removed.
        </p>
        <Link
          href="/jobs"
          className="inline-block px-6 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-sm shadow-sm"
        >
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const saved = isJobSaved(job.id);
  const applied = hasApplied(job.id);

  // Find similar jobs in the same category
  const similarJobs = jobs
    .filter((j) => j.id !== job.id && (j.category === job.category || j.job_type === job.job_type))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Back Button */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-primary-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </button>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-2 shrink-0">
              <img
                src={job.company_logo || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150"}
                alt={job.company_name || "Company"}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/companies/${job.company_id}`}
                  className="text-sm font-bold text-primary-600 hover:underline flex items-center gap-1"
                >
                  <Building2 className="w-4 h-4" /> {job.company_name}
                </Link>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-subText font-medium">{job.category}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <StatusBadge status={job.job_type} />
                <StatusBadge status={job.work_mode} />
                <span className="text-xs text-slate-500 flex items-center gap-1 ml-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-3 rounded-2xl border text-sm font-semibold transition flex items-center justify-center gap-2 ${
                saved
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "bg-white border-borderLine text-slate-600 hover:bg-slate-50"
              }`}
              title={saved ? "Unsave Job" : "Save Job"}
            >
              <Bookmark className={`w-5 h-5 ${saved ? "fill-rose-600" : ""}`} />
              <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </button>

            {applied ? (
              <Link
                href="/dashboard/applications"
                className="flex-1 sm:flex-initial px-6 py-3.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-100 transition shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Application Submitted</span>
              </Link>
            ) : (
              <button
                onClick={() => setApplyModalOpen(true)}
                className="flex-1 sm:flex-initial px-8 py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-md shadow-primary-600/20"
              >
                <Send className="w-4 h-4" />
                <span>Apply Now</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Job Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Stats */}
          <div className="bg-white rounded-3xl p-6 border border-borderLine shadow-subtle grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">Salary Range</span>
              <p className="text-sm font-extrabold text-mainText flex items-center gap-1">
                <IndianRupee className="w-4 h-4 text-emerald-600" />
                <span>{formatSalary(job.salary_min, job.salary_max, job.job_type)}</span>
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">Experience</span>
              <p className="text-sm font-bold text-mainText">{job.experience}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">Date Posted</span>
              <p className="text-sm font-bold text-mainText">{formatRelativeDate(job.created_at)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">Applicants</span>
              <p className="text-sm font-bold text-primary-600">{job.applicants_count || 0} applied</p>
            </div>
          </div>

          {/* Description & Responsibilities */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-mainText">About the Role</h3>
              <p className="text-sm text-subText leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-borderLine">
                <h3 className="text-lg font-bold text-mainText">Key Responsibilities</h3>
                <ul className="space-y-2.5">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-primary-600 mt-2 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-borderLine">
                <h3 className="text-lg font-bold text-mainText">Requirements & Qualifications</h3>
                <ul className="space-y-2.5">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.skills && job.skills.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-borderLine">
                <h3 className="text-lg font-bold text-mainText flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Required Technical Skills</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Company Brief & Similar Jobs */}
        <div className="space-y-8">
          {/* Company Brief Card */}
          <div className="bg-white rounded-3xl p-6 border border-borderLine shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-mainText">About {job.company_name}</h3>
            <p className="text-xs text-subText leading-relaxed line-clamp-4">
              Leading engineering and digital transformation company building scalable cloud solutions.
            </p>
            <div className="pt-2">
              <Link
                href={`/companies/${job.company_id}`}
                className="w-full py-2.5 rounded-xl border border-borderLine text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2"
              >
                <span>View Company Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Similar Jobs */}
          {similarJobs.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-mainText">Similar Vacancies</h3>
              <div className="space-y-4">
                {similarJobs.map((simJob) => (
                  <JobCard key={simJob.id} job={simJob} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        job={job}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  );
}
