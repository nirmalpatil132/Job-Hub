import React from "react";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Zap,
  Users,
  Target,
  Sparkles,
  Award,
  Layers,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-primary-50 text-primary-700 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Academic Project Specification
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-mainText tracking-tight">
          About <span className="text-primary-600">JobHub</span>
        </h1>
        <p className="text-base sm:text-lg text-subText leading-relaxed">
          JobHub is a modern, full-stack recruitment platform engineered to connect ambitious job seekers, students, and fresh graduates with dynamic tech employers.
        </p>
      </div>

      {/* Academic Note Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-indigo-900 text-white shadow-xl flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-800 text-indigo-300 flex items-center justify-center shrink-0">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">1st-Year BCA Capstone Project</h3>
            <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-2xl leading-relaxed">
              Designed and implemented following clean architecture principles, responsive Next.js App Router, Tailwind CSS, TypeScript, and Supabase PostgreSQL with Row Level Security (RLS).
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-xs font-semibold text-white border border-white/20">
            Version 1.0.0
          </span>
        </div>
      </div>

      {/* 3 Core Roles Section */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-mainText">Triple-Role Architecture</h2>
          <p className="text-xs sm:text-sm text-subText mt-1">
            Built specifically to cater to three distinct user archetypes with scoped permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Seeker */}
          <div className="p-6 rounded-3xl bg-white border border-borderLine shadow-subtle space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-mainText">01. Job Seeker</h3>
            <p className="text-xs text-subText leading-relaxed">
              Browse, search, and filter verified jobs. Bookmark opportunities, submit customized applications with resumes, and track progress through a live 5-stage status pipeline.
            </p>
          </div>

          {/* Recruiter */}
          <div className="p-6 rounded-3xl bg-white border border-borderLine shadow-subtle space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-mainText">02. Recruiter</h3>
            <p className="text-xs text-subText leading-relaxed">
              Manage employer profile, publish job listings, screen incoming applicant submissions, review cover letters & resumes, and update candidate hiring stages in real time.
            </p>
          </div>

          {/* Admin */}
          <div className="p-6 rounded-3xl bg-white border border-borderLine shadow-subtle space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-mainText">03. Administrator</h3>
            <p className="text-xs text-subText leading-relaxed">
              Monitor total platform metrics, manage user accounts, activate/deactivate users, moderate job postings, and audit system-wide application activity.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Breakdown */}
      <div className="p-8 rounded-3xl bg-white border border-borderLine shadow-subtle space-y-6">
        <h2 className="text-xl font-bold text-mainText flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary-600" /> Technology Foundation
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="font-bold text-mainText text-sm">Next.js 15</p>
            <p className="text-subText mt-0.5">App Router & Server Actions</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="font-bold text-mainText text-sm">TypeScript</p>
            <p className="text-subText mt-0.5">Strict static type safety</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="font-bold text-mainText text-sm">Tailwind CSS</p>
            <p className="text-subText mt-0.5">Custom design tokens</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="font-bold text-mainText text-sm">Supabase PostgreSQL</p>
            <p className="text-subText mt-0.5">Relational schema & RLS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
