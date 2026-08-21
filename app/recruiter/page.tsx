"use client";

import React from "react";
import Link from "next/link";
import { useJobHub } from "@/lib/context/JobHubContext";
import { StatusBadge } from "@/components/ui/Badge";
import { formatSalary, formatRelativeDate } from "@/lib/utils";
import {
  Briefcase,
  Users,
  FileCheck,
  CheckCircle2,
  PlusCircle,
  Building2,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";

export default function RecruiterOverviewPage() {
  const { currentUser, jobs, getRecruiterApplications } = useJobHub();

  const recruiterId = currentUser?.user_id || "rec-1";
  const recruiterJobs = jobs.filter((j) => j.recruiter_id === recruiterId);
  const recruiterApps = getRecruiterApplications(recruiterId);

  // Statistics
  const totalJobs = recruiterJobs.length;
  const activeJobs = recruiterJobs.filter((j) => j.status === "Active").length;
  const totalApplications = recruiterApps.length;
  const shortlistedCandidates = recruiterApps.filter(
    (a) => a.status === "Shortlisted" || a.status === "Interview" || a.status === "Selected"
  ).length;

  const recentJobs = recruiterJobs.slice(0, 4);
  const recentApps = recruiterApps.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white inline-flex items-center gap-1.5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" /> Employer Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome back, {currentUser?.full_name || "Recruiter"}!
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl leading-relaxed">
            Manage your company job postings, screen applicant submissions, and streamline your talent acquisition pipeline.
          </p>
        </div>

        <Link
          href="/recruiter/jobs/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-purple-800 font-bold text-xs sm:text-sm hover:bg-purple-50 shadow-md transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a New Job</span>
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Jobs */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-subText">Total Jobs Posted</p>
            <p className="text-2xl font-black text-mainText mt-0.5">{totalJobs}</p>
          </div>
        </div>

        {/* Active Jobs */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-subText">Active Listings</p>
            <p className="text-2xl font-black text-emerald-600 mt-0.5">{activeJobs}</p>
          </div>
        </div>

        {/* Total Applications */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-subText">Total Applicants</p>
            <p className="text-2xl font-black text-mainText mt-0.5">{totalApplications}</p>
          </div>
        </div>

        {/* Shortlisted Candidates */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-subText">Shortlisted / Offers</p>
            <p className="text-2xl font-black text-indigo-600 mt-0.5">{shortlistedCandidates}</p>
          </div>
        </div>
      </div>

      {/* Recruiter Active Jobs Section */}
      <div className="bg-white rounded-3xl p-6 border border-borderLine shadow-subtle space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-mainText">Your Job Postings</h2>
            <p className="text-xs text-subText mt-0.5">Overview of active and closed postings</p>
          </div>
          <Link
            href="/recruiter/jobs"
            className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1"
          >
            <span>Manage All ({totalJobs})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentJobs.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-purple-200 transition space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-semibold text-purple-700">{job.category}</span>
                    <h3 className="text-base font-bold text-mainText line-clamp-1 mt-0.5">{job.title}</h3>
                    <p className="text-xs text-subText">{job.location} • {job.job_type}</p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                      job.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <span className="font-semibold text-slate-600">
                    {job.applicants_count || 0} Applicants
                  </span>
                  <Link
                    href={`/recruiter/jobs/${job.id}/applicants`}
                    className="font-bold text-primary-600 hover:underline flex items-center gap-1"
                  >
                    <span>View Applicants</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl space-y-2">
            <Briefcase className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-mainText">No jobs posted yet</p>
            <Link
              href="/recruiter/jobs/new"
              className="inline-block mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary-600 text-white"
            >
              Post Your First Job
            </Link>
          </div>
        )}
      </div>

      {/* Recent Incoming Applicants Table */}
      <div className="bg-white rounded-3xl p-6 border border-borderLine shadow-subtle space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-mainText">Recent Applicant Submissions</h2>
            <p className="text-xs text-subText mt-0.5">Candidates who recently applied to your job postings</p>
          </div>
        </div>

        {recentApps.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-borderLine text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Candidate</th>
                  <th className="pb-3">Applied For</th>
                  <th className="pb-3">Applied Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5">
                      <p className="font-bold text-mainText">{app.applicant_name}</p>
                      <p className="text-subText text-[11px]">{app.applicant_email}</p>
                    </td>
                    <td className="py-3.5 font-semibold text-slate-700">{app.job_title}</td>
                    <td className="py-3.5 text-slate-400">{formatRelativeDate(app.applied_at)}</td>
                    <td className="py-3.5">
                      <StatusBadge status={app.status} size="sm" />
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        href={`/recruiter/jobs/${app.job_id}/applicants`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-primary-600 bg-primary-50 font-bold text-xs hover:bg-primary-100"
                      >
                        <span>Review</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl space-y-1 text-xs text-subText">
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No applicants yet</p>
            <p>Applications received from candidates will be listed here in real-time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
