"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJobHub } from "@/lib/context/JobHubContext";
import { StatusBadge } from "@/components/ui/Badge";
import { formatRelativeDate } from "@/lib/utils";
import { ApplicationStatus } from "@/types";
import {
  Users,
  Briefcase,
  FileText,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  ArrowLeft,
  Search,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

const ALL_STATUSES: ApplicationStatus[] = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

export default function JobApplicantsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const { getJobById, applications, updateApplicationStatus } = useJobHub();

  const job = getJobById(id);
  const jobApps = applications.filter((a) => a.job_id === id);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");

  if (!job) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-borderLine space-y-4">
        <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
        <h3 className="text-lg font-bold text-mainText">Job Not Found</h3>
        <button
          onClick={() => router.push("/recruiter/jobs")}
          className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  const filteredApps = jobApps.filter((app) => {
    const matchFilter = selectedFilter === "All" || app.status === selectedFilter;
    const matchSearch =
      (app.applicant_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (app.applicant_email || "").toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary-600 mb-2 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Jobs
        </button>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 inline-block mb-1">
              Candidate Screening
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">{job.title}</h1>
            <p className="text-xs sm:text-sm text-subText mt-1">
              {job.location} • {job.job_type} • {job.work_mode} • {jobApps.length} Total Applicants
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/jobs/${job.id}`}
              className="px-4 py-2.5 rounded-xl border border-borderLine text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <span>View Public Post</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-borderLine shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full sm:w-72 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name..."
            className="w-full bg-transparent text-xs text-mainText placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {["All", ...ALL_STATUSES].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedFilter === st
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applicants List */}
      <div className="space-y-4">
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-3xl p-6 border border-borderLine shadow-subtle hover:border-purple-200 transition space-y-5"
            >
              {/* Top Row: Candidate details & Status Selector */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg shrink-0">
                    {app.applicant_name?.charAt(0) || "C"}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-mainText">{app.applicant_name}</h3>
                    <p className="text-xs text-subText font-medium">{app.applicant_headline || "Candidate"}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-subText mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" /> {app.applicant_email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" /> {app.applicant_phone || app.phone || "+91 98765 00000"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> Applied {formatRelativeDate(app.applied_at)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Status Selector (Section 39) */}
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hiring Stage:</span>
                  <select
                    value={app.status}
                    onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                    className="px-3 py-1.5 rounded-xl border border-borderLine bg-white text-xs font-bold text-mainText focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-sm cursor-pointer"
                  >
                    {ALL_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Skills Row */}
              {app.applicant_skills && app.applicant_skills.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-500 mr-1">Skills:</span>
                  {app.applicant_skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Cover Letter Box */}
              {app.cover_letter && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-600" /> Cover Note from Candidate
                  </span>
                  <p className="text-slate-600 leading-relaxed italic">
                    "{app.cover_letter}"
                  </p>
                </div>
              )}

              {/* Resume & Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>Resume Attached:</span>
                  <strong className="text-mainText">{app.resume_url?.split("/").pop() || "Resume.pdf"}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${app.applicant_email}?subject=Regarding your application for ${job.title} at ${job.company_name}`}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-700 font-bold hover:bg-purple-100 transition flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact Candidate</span>
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-borderLine space-y-3 shadow-subtle">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-mainText">No candidates found</h3>
            <p className="text-xs text-subText">There are no applicant submissions matching "{selectedFilter}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
