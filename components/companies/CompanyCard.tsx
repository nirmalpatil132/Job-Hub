import React from "react";
import Link from "next/link";
import { Company } from "@/types";
import { Building2, MapPin, Briefcase, ExternalLink, ArrowRight } from "lucide-react";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl bg-white p-6 border border-borderLine hover:border-primary-300 hover:shadow-cardHover transition-all duration-300">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-1.5 shrink-0 group-hover:scale-105 transition-transform">
            <img
              src={company.logo_url}
              alt={company.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
            {company.open_jobs_count || 0} Open {company.open_jobs_count === 1 ? "Job" : "Jobs"}
          </span>
        </div>

        <div className="mt-4">
          <Link href={`/companies/${company.id}`}>
            <h3 className="text-lg font-bold text-mainText group-hover:text-primary-600 transition-colors line-clamp-1">
              {company.name}
            </h3>
          </Link>
          <p className="text-xs font-semibold text-primary-600 mt-0.5">{company.industry}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-subText mt-3">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{company.location}</span>
        </div>

        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {company.description}
        </p>
      </div>

      <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">
          {company.company_size || "50-100 employees"}
        </span>
        <Link
          href={`/companies/${company.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 group-hover:translate-x-1 transition-transform"
        >
          <span>View Company</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
