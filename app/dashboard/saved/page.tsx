"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useJobHub } from "@/lib/context/JobHubContext";
import { JobCard } from "@/components/jobs/JobCard";
import { Bookmark, Briefcase, ArrowRight } from "lucide-react";

export default function SavedJobsPage() {
  const { savedJobs, jobs, currentUser } = useJobHub();

  const userSavedJobIds = savedJobs
    .filter((s) => s.user_id === currentUser?.user_id)
    .map((s) => s.job_id);

  const savedJobList = jobs.filter((j) => userSavedJobIds.includes(j.id));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">Saved Jobs</h1>
          <p className="text-xs sm:text-sm text-subText mt-1">
            Jobs you have bookmarked to review or apply to later.
          </p>
        </div>
        <Link
          href="/jobs"
          className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-sm transition shrink-0"
        >
          Discover More
        </Link>
      </div>

      {/* Saved Jobs Grid */}
      {savedJobList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedJobList.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        /* Empty State (Section 53) */
        <div className="p-12 sm:p-16 text-center bg-white rounded-3xl border border-borderLine space-y-4 shadow-subtle">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-mainText">No saved jobs yet</h3>
          <p className="text-sm text-subText max-w-md mx-auto">
            Start exploring opportunities and bookmark the positions that match your skills and career interests.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            <Briefcase className="w-4 h-4" />
            <span>Find Jobs</span>
          </Link>
        </div>
      )}
    </div>
  );
}
