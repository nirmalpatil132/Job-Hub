"use client";

import React, { useState } from "react";
import { useJobHub } from "@/lib/context/JobHubContext";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { Search, Building2, MapPin, Filter } from "lucide-react";

export default function CompaniesPage() {
  const { companies } = useJobHub();
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const industries = ["All", ...Array.from(new Set(companies.map((c) => c.industry)))];

  const filteredCompanies = companies.filter((comp) => {
    const matchSearch =
      comp.name.toLowerCase().includes(search.toLowerCase()) ||
      comp.location.toLowerCase().includes(search.toLowerCase()) ||
      comp.description.toLowerCase().includes(search.toLowerCase());

    const matchIndustry = selectedIndustry === "All" || comp.industry === selectedIndustry;

    return matchSearch && matchIndustry;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-borderLine shadow-subtle text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700">
          <Building2 className="w-3.5 h-3.5" /> Employer Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-mainText">
          Explore Top Companies
        </h1>
        <p className="text-sm sm:text-base text-subText max-w-xl mx-auto">
          Discover innovative companies hiring top talent in software engineering, data science, design, and marketing.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-xl mx-auto">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200">
            <Search className="w-5 h-5 text-primary-600 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies by name, industry, or city..."
              className="w-full bg-transparent text-sm text-mainText placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Industry Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {industries.map((ind) => (
          <button
            key={ind}
            onClick={() => setSelectedIndustry(ind)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              selectedIndustry === ind
                ? "bg-primary-600 text-white shadow-sm"
                : "bg-white border border-borderLine text-slate-700 hover:bg-slate-50"
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="p-12 text-center bg-white rounded-3xl border border-borderLine space-y-3 max-w-md mx-auto">
          <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-mainText">No companies found</h3>
          <p className="text-xs text-subText">Try adjusting your search query or industry filter.</p>
        </div>
      )}
    </div>
  );
}
