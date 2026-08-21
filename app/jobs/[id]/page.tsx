"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
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

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
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
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-subText pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Posted {formatRelativeDate(job.created_at)}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {job.applicants_count || 0} Applicants
                </span>
              </div>
            </div>
          </div>

          {/* Quick Badges & Salary */}
          <div className="flex flex-col sm:items-end justify-center gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
            <div className="text-xl sm:text-2xl font-black text-emerald-600">
              {formatSalary(job.salary_min, job.salary_max, job.job_type)}
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={job.job_type} />
              <StatusBadge status={job.work_mode} />
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2-Cols: Detailed Information */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Job Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-4">
            <h2 className="text-xl font-bold text-mainText flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-600" /> About the Job
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-4">
              <h2 className="text-xl font-bold text-mainText">Key Responsibilities</h2>
              <ul className="space-y-2.5">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-primary-600 mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements & Qualifications */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-4">
              <h2 className="text-xl font-bold text-mainText">Requirements & Qualifications</h2>
              <ul className="space-y-2.5">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-4">
            <h2 className="text-xl font-bold text-mainText">Required Skills</h2>
            <div className="flex flex-wrap items-center gap-2">
              {job.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-50/80 text-primary-700 font-semibold text-xs sm:text-sm border border-indigo-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-4">
            <h2 className="text-xl font-bold text-mainText">Perks & Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-primary-600 font-bold">✓</span> Flexible Hybrid / Remote Options
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-primary-600 font-bold">✓</span> Health & Wellness Coverage
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-primary-600 font-bold">✓</span> Mentorship & Learning Stipend
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-primary-600 font-bold">✓</span> Performance Bonuses & Appraisals
              </div>
            </div>
          </div>
        </div>

        {/* Right 1-Col: Sticky Apply Card & Employer Overview */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-28">
          <div className="bg-white rounded-3xl p-6 border border-indigo-100 shadow-card space-y-6">
            <div>
              <h3 className="text-lg font-bold text-mainText">Apply for this Role</h3>
              <p className="text-xs text-subText mt-0.5">
                Join {job.company_name} and grow your tech career.
              </p>
            </div>

            {applied ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-emerald-950">Application Submitted</p>
                <p className="text-xs text-emerald-700">
                  You have applied for this job. Check your dashboard to track updates.
                </p>
                <Link
                  href="/dashboard/applications"
                  className="inline-block mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  View My Application
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply Now</span>
                </button>

                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className={`w-full py-3 rounded-2xl font-semibold text-xs border transition flex items-center justify-center gap-2 ${
                    saved
                      ? "bg-primary-50 border-primary-300 text-primary-700"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${saved ? "fill-primary-600" : ""}`} />
                  <span>{saved ? "Saved in Bookmarks" : "Save for Later"}</span>
                </button>
              </div>
            )}

            {/* Quick Meta List */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-subText">Experience</span>
                <span className="font-semibold text-mainText">{job.experience}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-subText">Work Mode</span>
                <span className="font-semibold text-mainText">{job.work_mode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-subText">Location</span>
                <span className="font-semibold text-mainText">{job.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-subText">Job Type</span>
                <span className="font-semibold text-mainText">{job.job_type}</span>
              </div>
            </div>
          </div>

          {/* Employer Mini Card */}
          <div className="bg-white rounded-3xl p-6 border border-borderLine shadow-subtle space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-subText">About the Employer</h4>
            <div className="flex items-center gap-3">
              <img
                src={job.company_logo || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150"}
                alt={job.company_name || "Company"}
                className="w-12 h-12 rounded-xl object-cover border border-slate-100"
              />
              <div>
                <h4 className="text-sm font-bold text-mainText">{job.company_name}</h4>
                <p className="text-xs text-subText">{job.company_location || "India"}</p>
              </div>
            </div>
            <Link
              href={`/companies/${job.company_id}`}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-borderLine text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <span>Visit Company Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Similar Opportunities Carousel / Grid */}
      {similarJobs.length > 0 && (
        <div className="pt-8 border-t border-borderLine space-y-6">
          <h3 className="text-xl font-bold text-mainText">Similar Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarJobs.map((simJob) => (
              <JobCard key={simJob.id} job={simJob} />
            ))}
          </div>
        </div>
      )}

      {/* Application Modal */}
      <ApplyModal
        job={job}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  );
}
