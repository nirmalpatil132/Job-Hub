"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useJobHub } from "@/lib/context/JobHubContext";
import { formatSalary, formatRelativeDate } from "@/lib/utils";
import {
  Briefcase,
  Search,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

export default function AdminJobsPage() {
  const { jobs, deleteJob, toggleJobStatus } = useJobHub();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const matchStatus = statusFilter === "All" || job.status === statusFilter;
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      (job.company_name || "").toLowerCase().includes(search.toLowerCase()) ||
      job.category.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleDelete = (id: string) => {
    deleteJob(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 inline-block mb-1">
            Job Moderation & Compliance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">Platform Job Postings</h1>
          <p className="text-xs sm:text-sm text-subText mt-1">
            Audit employer job vacancies, verify compliance, and moderate active listings.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-borderLine shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full sm:w-80 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search job title, company, category..."
            className="w-full bg-transparent text-xs text-mainText placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {["All", "Active", "Closed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                statusFilter === s
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s === "All" ? "All Statuses" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-3xl border border-borderLine shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-borderLine text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Job Title</th>
                <th className="py-4 px-4">Company</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Salary</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Posted</th>
                <th className="py-4 px-6 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 px-6">
                    <p className="font-bold text-mainText">{job.title}</p>
                    <p className="text-subText text-[11px] mt-0.5">{job.location} • {job.job_type}</p>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-700">{job.company_name}</td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{job.category}</td>
                  <td className="py-4 px-4 text-slate-600 font-semibold">
                    {formatSalary(job.salary_min, job.salary_max, job.job_type)}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold ${
                        job.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{formatRelativeDate(job.created_at)}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/jobs/${job.id}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-slate-100"
                        title="View Job"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => toggleJobStatus(job.id)}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-primary-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                      >
                        {job.status === "Active" ? "Close" : "Reopen"}
                      </button>
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
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-borderLine shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-mainText">Remove this job?</h3>
              <p className="text-xs text-subText">
                This will permanently delete the job and remove all associated candidate applications.
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
