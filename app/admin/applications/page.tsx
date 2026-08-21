"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useJobHub } from "@/lib/context/JobHubContext";
import { StatusBadge } from "@/components/ui/Badge";
import { formatRelativeDate } from "@/lib/utils";
import {
  FileText,
  Search,
  Building2,
  Calendar,
  User,
  ExternalLink,
} from "lucide-react";

export default function AdminApplicationsPage() {
  const { applications } = useJobHub();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = applications.filter((app) => {
    const matchStatus = statusFilter === "All" || app.status === statusFilter;
    const matchSearch =
      (app.applicant_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (app.job_title || "").toLowerCase().includes(search.toLowerCase()) ||
      (app.company_name || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 inline-block mb-1">
            System Workflow Audit
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">All Platform Applications</h1>
          <p className="text-xs sm:text-sm text-subText mt-1">
            Real-time record of all submissions, status transitions, and candidate interactions.
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
            placeholder="Search candidate, job, or employer..."
            className="w-full bg-transparent text-xs text-mainText placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {["All", "Applied", "Under Review", "Shortlisted", "Interview", "Selected", "Rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                statusFilter === st
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-3xl border border-borderLine shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-borderLine text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Candidate</th>
                <th className="py-4 px-4">Target Position</th>
                <th className="py-4 px-4">Company</th>
                <th className="py-4 px-4">Current Status</th>
                <th className="py-4 px-4">Applied Date</th>
                <th className="py-4 px-6 text-right">Job Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 px-6">
                    <p className="font-bold text-mainText">{app.applicant_name}</p>
                    <p className="text-subText text-[11px]">{app.applicant_email}</p>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-700">{app.job_title}</td>
                  <td className="py-4 px-4 font-medium text-slate-600">{app.company_name}</td>
                  <td className="py-4 px-4">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="py-4 px-4 text-slate-400">{formatRelativeDate(app.applied_at)}</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/jobs/${app.job_id}`}
                      className="inline-flex items-center gap-1 text-primary-600 hover:underline font-semibold"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
