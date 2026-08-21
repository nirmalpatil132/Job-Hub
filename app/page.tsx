"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJobHub } from "@/lib/context/JobHubContext";
import { JobCard } from "@/components/jobs/JobCard";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { JOB_CATEGORIES } from "@/lib/data/mockData";
import {
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Building2,
  Users,
  Briefcase,
  CheckCircle2,
  FileCheck,
  Award,
  Layers,
  Code,
  BarChart3,
  Palette,
  Megaphone,
  Coins,
  HeartPulse,
  Cpu,
  Headphones,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { jobs, companies, stats } = useJobHub();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchKeyword.trim()) params.set("keyword", searchKeyword.trim());
    if (searchLocation.trim()) params.set("location", searchLocation.trim());
    router.push(`/jobs?${params.toString()}`);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code": return <Code className="w-6 h-6 text-indigo-600" />;
      case "BarChart3": return <BarChart3 className="w-6 h-6 text-purple-600" />;
      case "Palette": return <Palette className="w-6 h-6 text-cyan-600" />;
      case "Megaphone": return <Megaphone className="w-6 h-6 text-amber-600" />;
      case "Coins": return <Coins className="w-6 h-6 text-emerald-600" />;
      case "HeartPulse": return <HeartPulse className="w-6 h-6 text-rose-600" />;
      case "Cpu": return <Cpu className="w-6 h-6 text-blue-600" />;
      case "Headphones": return <Headphones className="w-6 h-6 text-orange-600" />;
      default: return <Briefcase className="w-6 h-6 text-indigo-600" />;
    }
  };

  const featuredJobs = jobs.filter((j) => j.status === "Active").slice(0, 6);
  const topCompanies = companies.slice(0, 4);

  const popularTags = [
    { label: "Software Developer", query: "Software Developer" },
    { label: "Web Developer", query: "Web Developer" },
    { label: "Data Analyst", query: "Data Analyst" },
    { label: "UI/UX Designer", query: "UI/UX" },
    { label: "Python", query: "Python" },
    { label: "Internship", query: "Internship" },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-background border-b border-borderLine">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-bold tracking-wide shadow-sm animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Over {stats.totalJobs}+ Verified Tech & Graduate Opportunities</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-mainText tracking-tight leading-[1.15]">
              Find the right job. <br />
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Build your future.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-subText max-w-2xl mx-auto leading-relaxed">
              Discover meaningful opportunities from leading companies looking for talented students, freshers, and experienced professionals.
            </p>

            {/* Big Search Bar */}
            <div className="pt-4 max-w-4xl mx-auto">
              <form
                onSubmit={handleHeroSearch}
                className="bg-white rounded-3xl p-2.5 sm:p-3 shadow-xl border border-borderLine flex flex-col md:flex-row items-center gap-2 sm:gap-3"
              >
                {/* Keyword Field */}
                <div className="flex-1 flex items-center gap-3 w-full px-3.5 py-2.5 bg-slate-50 md:bg-transparent rounded-2xl md:rounded-none">
                  <Search className="w-5 h-5 text-primary-600 shrink-0" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Job title, skills, or keywords"
                    className="w-full bg-transparent text-sm sm:text-base text-mainText placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <div className="hidden md:block w-px h-8 bg-slate-200" />

                {/* Location Field */}
                <div className="flex-1 flex items-center gap-3 w-full px-3.5 py-2.5 bg-slate-50 md:bg-transparent rounded-2xl md:rounded-none">
                  <MapPin className="w-5 h-5 text-secondary-600 shrink-0" />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="City (e.g. Pune, Mumbai, Remote)"
                    className="w-full bg-transparent text-sm sm:text-base text-mainText placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all duration-200 shrink-0 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Jobs</span>
                </button>
              </form>

              {/* Popular Searches */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-xs">
                <span className="font-semibold text-slate-500">Popular Searches:</span>
                {popularTags.map((tag) => (
                  <Link
                    key={tag.label}
                    href={`/jobs?keyword=${encodeURIComponent(tag.query)}`}
                    className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-primary-400 hover:text-primary-600 shadow-subtle transition font-medium"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              Browse by Specialty
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-mainText mt-1">
              Explore Job Categories
            </h2>
          </div>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700 group"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {JOB_CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/jobs?category=${encodeURIComponent(cat.name)}`}
              className="group p-5 sm:p-6 rounded-2xl bg-white border border-borderLine hover:border-primary-400 hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-50 transition-all duration-200">
                {getCategoryIcon(cat.icon)}
              </div>
              <div className="mt-4">
                <h3 className="text-base font-bold text-mainText group-hover:text-primary-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-subText mt-1 font-medium">{cat.count} Open Positions</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED JOBS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              Handpicked Roles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-mainText mt-1">Featured Jobs</h2>
          </div>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700 group"
          >
            <span>View All ({jobs.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} featured />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-slate-900 text-white py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-400">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">How JobHub Works</h2>
            <p className="text-slate-400 text-sm">
              From discovering opportunities to scheduling interviews, our platform streamlines your career journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col items-start space-y-4">
              <span className="text-3xl font-black text-primary-400/30">01</span>
              <div className="w-12 h-12 rounded-xl bg-primary-600/20 text-primary-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Create Profile</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Build your professional profile, list your tech skills, and upload your resume.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col items-start space-y-4">
              <span className="text-3xl font-black text-secondary-400/30">02</span>
              <div className="w-12 h-12 rounded-xl bg-secondary-600/20 text-secondary-400 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Discover Jobs</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Search across verified companies and filter by work mode, location, and stipend.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col items-start space-y-4">
              <span className="text-3xl font-black text-cyan-400/30">03</span>
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Apply in 1-Click</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Submit tailored applications and cover letters directly to company recruiters.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col items-start space-y-4">
              <span className="text-3xl font-black text-emerald-400/30">04</span>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Get Hired</h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Track real-time application updates, schedule interviews, and accept job offers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TOP COMPANIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
              Verified Employers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-mainText mt-1">Top Companies</h2>
          </div>
          <Link
            href="/companies"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700 group"
          >
            <span>Explore All Companies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCompanies.map((comp) => (
            <CompanyCard key={comp.id} company={comp} />
          ))}
        </div>
      </section>

      {/* 6. PLATFORM STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-900 via-primary-900 to-purple-900 text-white shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="space-y-1 pt-4 sm:pt-0">
              <p className="text-3xl sm:text-5xl font-black text-white">{stats.totalJobs}+</p>
              <p className="text-xs sm:text-sm font-medium text-indigo-200">Active Jobs</p>
            </div>
            <div className="space-y-1 pt-4 sm:pt-0 sm:pl-8">
              <p className="text-3xl sm:text-5xl font-black text-white">{stats.totalCompanies}+</p>
              <p className="text-xs sm:text-sm font-medium text-indigo-200">Hiring Companies</p>
            </div>
            <div className="space-y-1 pt-4 sm:pt-0 sm:pl-8">
              <p className="text-3xl sm:text-5xl font-black text-white">{stats.totalJobSeekers}+</p>
              <p className="text-xs sm:text-sm font-medium text-indigo-200">Active Job Seekers</p>
            </div>
            <div className="space-y-1 pt-4 sm:pt-0 sm:pl-8">
              <p className="text-3xl sm:text-5xl font-black text-white">{stats.totalApplications}+</p>
              <p className="text-xs sm:text-sm font-medium text-indigo-200">Applications Sent</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION (CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-white border border-borderLine p-8 sm:p-14 text-center overflow-hidden shadow-card">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700 inline-block">
              Start Today
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-mainText">
              Your next opportunity is waiting.
            </h2>
            <p className="text-sm sm:text-base text-subText">
              Join thousands of job seekers and top companies building the future together on JobHub.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/jobs"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition"
              >
                Find Jobs
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
