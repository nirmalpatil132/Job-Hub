import React from "react";
import Link from "next/link";
import { Briefcase, Heart, Globe, Mail, MapPin, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 via-primary to-secondary-500 flex items-center justify-center text-white shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Job<span className="text-primary-400">Hub</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400"></span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Discover opportunities. Build your future. The modern recruitment platform connecting students, graduates, and professionals with forward-thinking employers.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400 text-xs">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary-400" /> Pune, India
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-primary-400" /> Pan-India Opportunities
              </span>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="hover:text-white transition">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-white transition">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/jobs?category=IT+%26+Software" className="hover:text-white transition">
                  IT & Software
                </Link>
              </li>
              <li>
                <Link href="/jobs?job_type=Internship" className="hover:text-white transition">
                  Internships
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: For Job Seekers */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">For Job Seekers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/register?role=job_seeker" className="hover:text-white transition">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link href="/dashboard/applications" className="hover:text-white transition">
                  My Applications
                </Link>
              </li>
              <li>
                <Link href="/dashboard/saved" className="hover:text-white transition">
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition">
                  Seeker Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Recruiters & Support */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">For Recruiters</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/recruiter/jobs/new" className="hover:text-white transition">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/recruiter" className="hover:text-white transition">
                  Recruiter Dashboard
                </Link>
              </li>
              <li>
                <Link href="/recruiter/company" className="hover:text-white transition">
                  Company Profile
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About JobHub
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Support & Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 JobHub. Academic Project.</p>
          <div className="flex items-center gap-4">
            <span>Built with Next.js & Supabase</span>
            <span>•</span>
            <span className="text-slate-400">1st-Year BCA Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
