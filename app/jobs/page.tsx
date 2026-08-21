"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useJobHub } from "@/lib/context/JobHubContext";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilterPanel } from "@/components/jobs/JobFilterPanel";
import { FilterState } from "@/types";
import {
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  Briefcase,
  X,
} from "lucide-react";

function JobListingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getFilteredJobs } = useJobHub();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Initialize filter state from searchParams
  const [filters, setFilters] = useState<FilterState>(() => {
    return {
      keyword: searchParams.get("keyword") || "",
      location: searchParams.get("location") || "",
      category: searchParams.get("category") || "",
      job_type: searchParams.getAll("job_type"),
      work_mode: searchParams.getAll("work_mode"),
      experience: searchParams.getAll("experience"),
      salary_min: Number(searchParams.get("salary_min")) || 0,
      date_posted: searchParams.get("date_posted") || "any",
      sort_by: (searchParams.get("sort_by") as any) || "recent",
    };
  });

  // Sync state if URL query params change externally
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      keyword: searchParams.get("keyword") || "",
      location: searchParams.get("location") || "",
      category: searchParams.get("category") || "",
    }));
  }, [searchParams]);

  // Sync URL query params when filters change
  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    const params = new URLSearchParams();
    if (updated.keyword) params.set("keyword", updated.keyword);
    if (updated.location) params.set("location", updated.location);
    if (updated.category) params.set("category", updated.category);
    if (updated.salary_min > 0) params.set("salary_min", updated.salary_min.toString());
    if (updated.date_posted && updated.date_posted !== "any") params.set("date_posted", updated.date_posted);
    if (updated.sort_by && updated.sort_by !== "recent") params.set("sort_by", updated.sort_by);
    updated.job_type.forEach((jt) => params.append("job_type", jt));
    updated.work_mode.forEach((wm) => params.append("work_mode", wm));
    updated.experience.forEach((exp) => params.append("experience", exp));

    router.replace(`/jobs?${params.toString()}`, { scroll: false });
  };

  const handleResetFilters = () => {
    const resetState: FilterState = {
      keyword: "",
      location: "",
      category: "",
      job_type: [],
      work_mode: [],
      experience: [],
      salary_min: 0,
      date_posted: "any",
      sort_by: "recent",
    };
    setFilters(resetState);
    router.replace("/jobs");
  };

  const filteredJobs = getFilteredJobs(filters);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-borderLine shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Keyword Search */}
          <div className="flex-1 flex items-center gap-3 w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <Search className="w-5 h-5 text-primary-600 shrink-0" />
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) => updateFilters({ keyword: e.target.value })}
              placeholder="Search by job title, skill (e.g. React, Python), or company"
              className="w-full bg-transparent text-sm text-mainText placeholder:text-slate-400 focus:outline-none"
            />
            {filters.keyword && (
              <button
                onClick={() => updateFilters({ keyword: "" })}
                className="text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Search */}
          <div className="flex-1 flex items-center gap-3 w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <MapPin className="w-5 h-5 text-secondary-600 shrink-0" />
            <input
              type="text"
              value={filters.location}
              onChange={(e) => updateFilters({ location: e.target.value })}
              placeholder="City (e.g. Pune, Mumbai, Remote)"
              className="w-full bg-transparent text-sm text-mainText placeholder:text-slate-400 focus:outline-none"
            />
            {filters.location && (
              <button
                onClick={() => updateFilters({ location: "" })}
                className="text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Badges & Sort Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-mainText">{filteredJobs.length} Jobs Available</span>
            {(filters.keyword || filters.location || filters.category || filters.job_type.length > 0) && (
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold">
                Filters active
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary-600" />
              <span>Filters</span>
            </button>

            {/* Sorting Select */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={filters.sort_by}
                onChange={(e) => updateFilters({ sort_by: e.target.value as any })}
                className="px-3 py-1.5 rounded-xl border border-borderLine bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="recent">Most Recent</option>
                <option value="salary_desc">Salary: High to Low</option>
                <option value="salary_asc">Salary: Low to High</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left: Desktop Filter Panel */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28">
          <JobFilterPanel
            filters={filters}
            onFilterChange={updateFilters}
            onReset={handleResetFilters}
            totalResults={filteredJobs.length}
          />
        </div>

        {/* Right: Job Listings Grid */}
        <div className="lg:col-span-3 space-y-6">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-3xl bg-white border border-borderLine p-12 text-center space-y-4 shadow-subtle">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-mainText">No matching jobs found</h3>
              <p className="text-sm text-subText max-w-md mx-auto">
                We couldn't find any opportunities matching your current search and filter criteria. Try adjusting your keywords or clearing the filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-sm transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-sm bg-white min-h-full p-6 space-y-6 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-borderLine">
              <h3 className="font-bold text-lg text-mainText">Filter Opportunities</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <JobFilterPanel
              filters={filters}
              onFilterChange={updateFilters}
              onReset={handleResetFilters}
              totalResults={filteredJobs.length}
            />

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-primary-600 text-white font-bold text-sm shadow-md"
            >
              Show {filteredJobs.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Job Listings...</div>}>
      <JobListingsContent />
    </Suspense>
  );
}
