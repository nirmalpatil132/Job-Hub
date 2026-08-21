"use client";

import React from "react";
import Link from "next/link";
import { useJobHub } from "@/lib/context/JobHubContext";
import {
  Users,
  Briefcase,
  Building2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AdminOverviewPage() {
  const { stats, profiles, jobs, applications, companies } = useJobHub();

  const recentUsers = profiles.slice(-5).reverse();
  const recentJobs = jobs.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-700 via-rose-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white inline-flex items-center gap-1.5 backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5" /> Platform Governance & Audit
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">System Administration Dashboard</h1>
          <p className="text-xs sm:text-sm text-rose-100 max-w-xl leading-relaxed">
            Monitor platform health, manage registered users, moderate job vacancies, and audit applications.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/20 backdrop-blur-sm text-xs font-semibold">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>System Online & Healthy</span>
        </div>
      </div>

      {/* 5 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Users */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Users</span>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-mainText mt-3">{stats.totalJobSeekers}</p>
          <span className="text-[11px] text-slate-400 mt-1 font-medium">Job Seekers</span>
        </div>

        {/* Total Recruiters */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Recruiters</span>
            <Building2 className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-purple-600 mt-3">{stats.totalRecruiters}</p>
          <span className="text-[11px] text-slate-400 mt-1 font-medium">Hiring Managers</span>
        </div>

        {/* Total Companies */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Companies</span>
            <Building2 className="w-5 h-5 text-cyan-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-cyan-600 mt-3">{stats.totalCompanies}</p>
          <span className="text-[11px] text-slate-400 mt-1 font-medium">Verified Employers</span>
        </div>

        {/* Total Jobs */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Jobs</span>
            <Briefcase className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-3">{stats.totalJobs}</p>
          <span className="text-[11px] text-slate-400 mt-1 font-medium">{stats.activeJobs} Active</span>
        </div>

        {/* Total Applications */}
        <div className="bg-white rounded-2xl p-5 border border-borderLine shadow-subtle flex flex-col justify-between col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Applications</span>
            <FileText className="w-5 h-5 text-rose-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-rose-600 mt-3">{stats.totalApplications}</p>
          <span className="text-[11px] text-slate-400 mt-1 font-medium">Submitted Total</span>
        </div>
      </div>

      {/* Quick Administration Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/users"
          className="p-6 rounded-3xl bg-white border border-borderLine hover:border-indigo-300 hover:shadow-cardHover transition group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-mainText group-hover:text-primary-600 transition">
            User Management
          </h3>
          <p className="text-xs text-subText">
            View profiles, toggle user activation status, review roles, and manage permissions.
          </p>
          <div className="pt-2 text-xs font-bold text-primary-600 flex items-center gap-1">
            <span>Manage Users</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/jobs"
          className="p-6 rounded-3xl bg-white border border-borderLine hover:border-emerald-300 hover:shadow-cardHover transition group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-mainText group-hover:text-emerald-600 transition">
            Job Moderation
          </h3>
          <p className="text-xs text-subText">
            Audit job vacancies, verify compliance, toggle status, and delete obsolete postings.
          </p>
          <div className="pt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
            <span>Moderate Jobs</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/applications"
          className="p-6 rounded-3xl bg-white border border-borderLine hover:border-rose-300 hover:shadow-cardHover transition group space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-mainText group-hover:text-rose-600 transition">
            Application Audit
          </h3>
          <p className="text-xs text-subText">
            Monitor real-time application workflow across all companies and candidates.
          </p>
          <div className="pt-2 text-xs font-bold text-rose-600 flex items-center gap-1">
            <span>Audit Submissions</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
