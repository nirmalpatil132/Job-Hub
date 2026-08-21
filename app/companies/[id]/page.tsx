"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJobHub } from "@/lib/context/JobHubContext";
import { JobCard } from "@/components/jobs/JobCard";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Briefcase,
  ArrowLeft,
  Calendar,
  ExternalLink,
} from "lucide-react";

export default function CompanyProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const { getCompanyById, jobs } = useJobHub();

  const company = getCompanyById(id);

  if (!company) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-2xl font-bold text-mainText">Company Not Found</h2>
        <Link
          href="/companies"
          className="inline-block px-6 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold"
        >
          View All Companies
        </Link>
      </div>
    );
  }

  // Get active jobs for this company
  const companyJobs = jobs.filter((j) => j.company_id === company.id && j.status === "Active");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Back Button */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-primary-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Companies</span>
        </button>
      </div>

      {/* Company Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-borderLine shadow-subtle space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-2 shrink-0 shadow-sm">
              <img
                src={company.logo_url}
                alt={company.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="space-y-1.5">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700">
                {company.industry}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-mainText">{company.name}</h1>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-subText pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {company.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" /> {company.company_size || "100-250 employees"}
                </span>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary-600 hover:underline font-semibold"
                  >
                    <Globe className="w-3.5 h-3.5" /> Visit Website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
            <span className="text-xs text-subText">Active Opportunities</span>
            <span className="text-2xl sm:text-3xl font-black text-primary-600">
              {companyJobs.length} Open {companyJobs.length === 1 ? "Job" : "Jobs"}
            </span>
          </div>
        </div>

        {/* Company Description */}
        <div className="pt-6 border-t border-slate-100">
          <h2 className="text-base font-bold text-mainText mb-2">About {company.name}</h2>
          <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">{company.description}</p>
        </div>
      </div>

      {/* Open Positions Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-mainText flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary-600" /> Open Positions at {company.name} ({companyJobs.length})
          </h2>
        </div>

        {companyJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-borderLine space-y-3">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-mainText">No Active Openings Currently</h3>
            <p className="text-xs text-subText">
              This company has no open positions right now. Check back later or explore other companies.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
