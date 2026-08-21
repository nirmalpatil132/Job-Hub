"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useJobHub } from "@/lib/context/JobHubContext";
import { formatRelativeDate, formatSalary } from "@/lib/utils";
import {
  Briefcase,
  PlusCircle,
  Eye,
  Edit,
  Users,
  Power,
  Trash2,
  AlertTriangle,
  X,
  Search,
} from "lucide-react";

export default function ManageJobsPage() {
  const { currentUser, jobs, deleteJob, toggleJobStatus } = useJobHub();

  const recruiterId = currentUser?.user_id || "rec-1";
  const recruiterJobs = jobs.filter((j) => j.recruiter_id === recruiterId);

  const [search, setSearch] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredJobs = recruiterJobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deleteJob(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">Manage Posted Jobs</h1>
          <p className="text-xs sm:text-sm text-subText mt-1">
            Monitor vacancies, review applicant submissions, and manage listing statuses.
          </p>
        </div>
        <Link
          href="/recruiter/jobs/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Job</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-borderLine shadow-subtle flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 w-full sm:w-80 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your job listings..."
            className="w-full bg-transparent text-xs text-mainText placeholder:text-slate-400 focus:outline-none"
          />
        </div>
        <span className="text-xs font-semibold text-slate-500 hidden sm:block">
          {filteredJobs.length} Jobs Total
        </span>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-3xl border border-borderLine shadow-subtle overflow-hidden">
        {filteredJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-borderLine text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Job Position</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Compensation</th>
                  <th className="py-4 px-4">Applicants</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Created</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4 px-6">
                      <p className="font-bold text-mainText text-sm">{job.title}</p>
                      <p className="text-subText text-[11px] mt-0.5">{job.location} • {job.work_mode}</p>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-700">{job.category}</td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {formatSalary(job.salary_min, job.salary_max, job.job_type)}
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        href={`/recruiter/jobs/${job.id}/applicants`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 text-purple-700 font-bold hover:bg-purple-100 transition"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>{job.applicants_count || 0}</span>
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleJobStatus(job.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                          job.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                        title="Click to toggle status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${job.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                        <span>{job.status}</span>
                      </button>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{formatRelativeDate(job.created_at)}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-slate-100"
                          title="View public job page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/recruiter/jobs/${job.id}/edit`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50"
                          title="Edit Job"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/recruiter/jobs/${job.id}/applicants`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                          title="View Applicants"
                        >
                          <Users className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirmId(job.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-mainText">No posted jobs</h3>
            <p className="text-xs text-subText">Publish a new job listing to start receiving candidate applications.</p>
            <Link
              href="/recruiter/jobs/new"
              className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-sm"
            >
              Post a Job Now
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal (Section 36) */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-borderLine shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-mainText">Delete this job listing?</h3>
              <p className="text-xs text-subText leading-relaxed">
                This action cannot be undone. All submitted candidate applications for this position will also be removed.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
