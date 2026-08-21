"use client";

import React from "react";
import { FilterState } from "@/types";
import { JOB_CATEGORIES } from "@/lib/data/mockData";
import { Filter, RotateCcw, Briefcase, MapPin, Layers, DollarSign, Calendar } from "lucide-react";

interface JobFilterPanelProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

const JOB_TYPES = ["Full Time", "Part Time", "Internship", "Contract"];
const WORK_MODES = ["On-site", "Hybrid", "Remote"];
const EXPERIENCES = ["Fresher", "0–1 years", "1–3 years", "3+ years"];
const DATE_OPTIONS = [
  { label: "Any time", value: "any" },
  { label: "Past 24 hours", value: "today" },
  { label: "Past 3 days", value: "3days" },
  { label: "Past week", value: "7days" },
  { label: "Past month", value: "30days" },
];

export function JobFilterPanel({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}: JobFilterPanelProps) {
  const toggleArrayItem = (key: "job_type" | "work_mode" | "experience", item: string) => {
    const current = filters[key] || [];
    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    onFilterChange({ [key]: updated });
  };

  return (
    <div className="bg-white rounded-2xl border border-borderLine p-6 shadow-subtle space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-borderLine">
        <div className="flex items-center gap-2 text-mainText font-bold text-base">
          <Filter className="w-4 h-4 text-primary-600" />
          <span>Filters</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {totalResults} jobs
          </span>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-primary-600 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Dropdown */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-primary-600" />
          Category
        </label>
        <select
          value={filters.category || ""}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition"
        >
          <option value="">All Categories</option>
          {JOB_CATEGORIES.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name} ({cat.count})
            </option>
          ))}
        </select>
      </div>

      {/* Job Type */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-primary-600" />
          Job Type
        </label>
        <div className="space-y-2">
          {JOB_TYPES.map((type) => {
            const isChecked = filters.job_type?.includes(type);
            return (
              <label
                key={type}
                className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-mainText cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayItem("job_type", type)}
                  className="w-4 h-4 rounded text-primary-600 border-slate-300 focus:ring-primary-500 rounded-sm"
                />
                <span>{type}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Work Mode */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-primary-600" />
          Work Mode
        </label>
        <div className="space-y-2">
          {WORK_MODES.map((mode) => {
            const isChecked = filters.work_mode?.includes(mode);
            return (
              <label
                key={mode}
                className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-mainText cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayItem("work_mode", mode)}
                  className="w-4 h-4 rounded text-primary-600 border-slate-300 focus:ring-primary-500 rounded-sm"
                />
                <span>{mode}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-primary-600" />
          Experience Level
        </label>
        <div className="space-y-2">
          {EXPERIENCES.map((exp) => {
            const isChecked = filters.experience?.includes(exp);
            return (
              <label
                key={exp}
                className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-mainText cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayItem("experience", exp)}
                  className="w-4 h-4 rounded text-primary-600 border-slate-300 focus:ring-primary-500 rounded-sm"
                />
                <span>{exp}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Salary Minimum Filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            Min. Salary (Annual / Mo)
          </label>
          <span className="text-xs font-semibold text-primary-600">
            {filters.salary_min > 0 ? `₹${filters.salary_min.toLocaleString("en-IN")}+` : "Any"}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1500000"
          step="50000"
          value={filters.salary_min || 0}
          onChange={(e) => onFilterChange({ salary_min: Number(e.target.value) })}
          className="w-full accent-primary-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
          <span>₹0</span>
          <span>₹5 LPA</span>
          <span>₹10 LPA</span>
          <span>₹15+ LPA</span>
        </div>
      </div>

      {/* Date Posted */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-primary-600" />
          Date Posted
        </label>
        <select
          value={filters.date_posted || "any"}
          onChange={(e) => onFilterChange({ date_posted: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-borderLine bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition"
        >
          {DATE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
