"use client";

import React from "react";
import Link from "next/link";
import { useJobHub } from "@/lib/context/JobHubContext";
import { StatusBadge } from "@/components/ui/Badge";
import { calculateProfileCompletion, formatRelativeDate } from "@/lib/utils";
import {
  FileText,
  Clock,
  Award,
  Calendar,
  Briefcase,
  ArrowRight,
  UserCheck,
  Building,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function SeekerDashboardPage() {
  const { currentUser, getApplicantApplications, jobs, education } = useJobHub();

  const myApplications = getApplicantApplications();

  // Metrics
  const totalApps = myApplications.length;
  const underReview = myApplications.filter((a) => a.status === "Under Review").length;
  const shortlisted = myApplications.filter((a) => a.status === "Shortlisted").length;
  const interviews = myApplications.filter((a) => a.status === "Interview").length;

  const completion = calculateProfileCompletion(currentUser, education.length);

  const recentApps = myApplications.slice(0, 4);
  const recommendedJobs = jobs.filter((j) => j.status === "Active").slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white inline-flex items-center gap-1.5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" /> Seeker Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome back, {currentUser?.full_name || "Job Seeker"}!
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-xl leading-relaxed">
            {currentUser?.headline || "Explore new vacancies matching your skills and track your existing applications."}
          </p>
        </div>

        <Link
          href="/jobs"
          className="px-5 py-2.5 rounded-xl bg-white text-primary-700 font-bold text-xs sm:text-sm hover:bg-indigo-50 shadow-md transition shrink-0"
        >
          Explore New Jobs
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Applications */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-subText">Total Applications</p>
            <p className="text-2xl font-black text-mainText mt-0.5">{totalApps}</p>
          </div>
        </div>

        {/* Under Review */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-subText">Under Review</p>
            <p className="text-2xl font-black text-amber-600 mt-0.5">{underReview}</p>
          </div>
        </div>

        {/* Shortlisted */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-subText">Shortlisted</p>
            <p className="text-2xl font-black text-purple-600 mt-0.5">{shortlisted}</p>
          </div>
        </div>

        {/* Interviews */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-subText">Interviews</p>
            <p className="text-2xl font-black text-emerald-600 mt-0.5">{interviews}</p>
          </div>
        </div>
      </div>

      {/* Profile Completion Indicator (Section 67) */}
      {completion.percentage < 100 && (
        <div className="bg-white rounded-3xl p-6 border border-indigo-100 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-mainText flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-primary-600" /> Profile {completion.percentage}% Complete
              </h3>
              <span className="text-xs font-bold text-primary-600">{completion.percentage}%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-600 to-accent-500 rounded-full transition-all duration-500"
                style={{ width: `${completion.percentage}%` }}
              />
            </div>
            {completion.missingFields.length > 0 && (
              <p className="text-xs text-subText">
                Missing: <span className="text-amber-700 font-medium">{completion.missingFields.join(", ")}</span>
              </p>
            )}
          </div>

          <Link
            href="/dashboard/profile"
            className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-xs transition shrink-0"
          >
            Complete Profile
          </Link>
        </div>
      )}

      {/* Recent Applications Table */}
      <div className="bg-white rounded-3xl p-6 border border-borderLine shadow-subtle space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-mainText">Recent Applications</h2>
            <p className="text-xs text-subText mt-0.5">Track the status of your recent job submissions</p>
          </div>
          <Link
            href="/dashboard/applications"
            className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1"
          >
            <span>View All ({myApplications.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentApps.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-borderLine text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Job Position</th>
                  <th className="pb-3">Company</th>
                  <th className="pb-3">Applied Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 font-bold text-mainText">
                      <Link href={`/jobs/${app.job_id}`} className="hover:text-primary-600 transition">
                        {app.job_title}
                      </Link>
                    </td>
                    <td className="py-3.5 text-subText font-medium">{app.company_name}</td>
                    <td className="py-3.5 text-slate-400">{formatRelativeDate(app.applied_at)}</td>
                    <td className="py-3.5">
                      <StatusBadge status={app.status} size="sm" />
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        href="/dashboard/applications"
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-primary-600 bg-primary-50 font-bold text-xs hover:bg-primary-100"
                      >
                        <span>Track</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl space-y-2">
            <Briefcase className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-mainText">No applications submitted yet</p>
            <p className="text-xs text-subText">Explore active positions and apply with your resume.</p>
            <Link
              href="/jobs"
              className="inline-block mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary-600 text-white"
            >
              Browse Jobs
            </Link>
          </div>
        )}
      </div>

      {/* Recommended Jobs */}
      <div className="bg-white rounded-3xl p-6 border border-borderLine shadow-subtle space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-mainText">Recommended For You</h2>
          <Link href="/jobs" className="text-xs font-bold text-primary-600 hover:underline">
            View More
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedJobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-primary-300 hover:shadow-card transition group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-primary-600">{job.company_name}</span>
                <h4 className="text-sm font-bold text-mainText group-hover:text-primary-600 transition line-clamp-1 mt-0.5">
                  {job.title}
                </h4>
                <p className="text-xs text-subText mt-2">{job.location} • {job.job_type}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-600">₹{job.salary_max ? (job.salary_max / 100000).toFixed(1) + " LPA" : "Competitive"}</span>
                <span className="text-primary-600 font-semibold group-hover:translate-x-0.5 transition-transform">Apply →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
