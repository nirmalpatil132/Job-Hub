"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useJobHub } from "@/lib/context/JobHubContext";
import { StatusBadge } from "@/components/ui/Badge";
import { ApplicationTracker } from "@/components/jobs/ApplicationTracker";
import { formatRelativeDate } from "@/lib/utils";
import { ApplicationStatus } from "@/types";
import {
  FileText,
  Building2,
  Calendar,
  Phone,
  FileCheck,
  Search,
  Filter,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const STATUS_FILTERS = ["All", "Applied", "Under Review", "Shortlisted", "Interview", "Selected", "Rejected"];

function ApplicationsContent() {
  const { getApplicantApplications } = useJobHub();
  const applications = getApplicantApplications();

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);

  const filtered = applications.filter((app) => {
    const matchStatus = selectedStatus === "All" || app.status === selectedStatus;
    const matchSearch =
      (app.job_title || "").toLowerCase().includes(search.toLowerCase()) ||
      (app.company_name || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedAppId(expandedAppId === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">My Applications</h1>
          <p className="text-xs sm:text-sm text-subText mt-1">
            Track real-time hiring progress and interview status for your job applications.
          </p>
        </div>
        <Link
          href="/jobs"
          className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-sm transition shrink-0"
        >
          Find More Jobs
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-borderLine shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="flex items-center gap-2.5 w-full sm:w-72 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job or company..."
            className="w-full bg-transparent text-xs text-mainText placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {STATUS_FILTERS.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedStatus === st
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((app) => {
            const isExpanded = expandedAppId === app.id;

            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl p-6 border border-borderLine shadow-subtle hover:border-primary-200 transition space-y-4"
              >
                {/* Main Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-1 shrink-0">
                      <img
                        src={app.company_logo || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150"}
                        alt={app.company_name || "Company"}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/jobs/${app.job_id}`}
                        className="text-base sm:text-lg font-bold text-mainText hover:text-primary-600 transition flex items-center gap-1.5"
                      >
                        <span>{app.job_title}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-subText mt-0.5">
                        <span className="font-semibold text-slate-700">{app.company_name}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" /> Applied {formatRelativeDate(app.applied_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <StatusBadge status={app.status} size="md" />
                    <button
                      onClick={() => toggleExpand(app.id)}
                      className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-primary-600 hover:bg-slate-50 transition"
                      title="View Details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Visual Status Progress Pipeline (Section 30) */}
                <div className="pt-2">
                  <ApplicationTracker status={app.status} />
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-in fade-in duration-200">
                    {/* Cover Letter */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <p className="font-bold text-slate-700 uppercase tracking-wider">Cover Letter / Note</p>
                      <p className="text-slate-600 leading-relaxed italic">
                        "{app.cover_letter || "No cover letter attached."}"
                      </p>
                    </div>

                    {/* Contact & Resume Meta */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <p className="font-bold text-slate-700 uppercase tracking-wider">Submitted Credentials</p>
                      <div className="space-y-1.5 text-slate-600">
                        <p className="flex justify-between">
                          <span>Applicant Name:</span>
                          <strong className="text-mainText">{app.applicant_name}</strong>
                        </p>
                        <p className="flex justify-between">
                          <span>Contact Phone:</span>
                          <strong className="text-mainText">{app.applicant_phone || app.phone}</strong>
                        </p>
                        <p className="flex justify-between">
                          <span>Resume File:</span>
                          <span className="font-semibold text-primary-600 underline">
                            {app.resume_url?.split("/").pop() || "Resume.pdf"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-borderLine space-y-3 shadow-subtle">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-mainText">No applications found</h3>
            <p className="text-xs text-subText max-w-sm mx-auto">
              You don't have any job applications under "{selectedStatus}".
            </p>
            <Link
              href="/jobs"
              className="inline-block px-5 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-sm"
            >
              Browse Open Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  return <ApplicationsContent />;
}
