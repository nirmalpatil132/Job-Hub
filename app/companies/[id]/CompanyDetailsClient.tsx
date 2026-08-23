"use client";

import React from "react";
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

export function CompanyDetailsClient({ id }: { id: string }) {
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

  // Filter jobs posted by this company
  const companyJobs = jobs.filter(
    (j) => j.company_id === company.id || j.company_name === company.name
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Back Button */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-primary-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </button>
      </div>

      {/* Header Profile Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-borderLine shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-5">
          <img
            src={company.logo_url || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150"}
            alt={company.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-100 p-2 shrink-0 shadow-sm bg-slate-50"
          />
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700 inline-block">
              {company.industry}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-mainText">{company.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-subText font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-400" /> {company.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-slate-400" /> {company.company_size || "50-200 employees"}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4 text-emerald-600" /> {companyJobs.length} Active Openings
              </span>
            </div>
          </div>
        </div>

        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Description & Open Openings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-borderLine shadow-subtle space-y-4">
          <h3 className="text-base font-bold text-mainText">Company Bio</h3>
          <p className="text-xs text-subText leading-relaxed">{company.description}</p>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-mainText">Active Opportunities</h2>
            <span className="text-xs text-subText font-semibold">{companyJobs.length} jobs available</span>
          </div>

          <div className="space-y-4">
            {companyJobs.length > 0 ? (
              companyJobs.map((j) => <JobCard key={j.id} job={j} />)
            ) : (
              <div className="p-10 text-center bg-white rounded-3xl border border-borderLine space-y-2">
                <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-mainText">No Active Vacancies</h4>
                <p className="text-xs text-subText">This employer has no open positions currently listed.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
