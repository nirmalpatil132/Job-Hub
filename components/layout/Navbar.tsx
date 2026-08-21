"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useJobHub } from "@/lib/context/JobHubContext";
import {
  Briefcase,
  Search,
  Building2,
  Bookmark,
  FileText,
  Bell,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, currentRole, isAuthenticated, logout, switchDemoRole, unreadNotificationsCount } = useJobHub();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-borderLine bg-white/95 backdrop-blur-md transition-all">
      {/* Top Demo Bar for Easy Testing */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
              ACADEMIC DEMO MODE
            </span>
            <span className="hidden sm:inline text-slate-400">
              Current Persona: <strong className="text-white font-medium capitalize">{currentUser?.full_name || "Guest"}</strong> ({currentRole.replace("_", " ")})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-[11px]">Quick Switch:</span>
            <button
              onClick={() => switchDemoRole("job_seeker", "user-1")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                currentRole === "job_seeker"
                  ? "bg-indigo-600 text-white font-semibold shadow-sm"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Seeker (Rahul)
            </button>
            <button
              onClick={() => switchDemoRole("recruiter", "rec-1")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                currentRole === "recruiter"
                  ? "bg-purple-600 text-white font-semibold shadow-sm"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Recruiter (Priya)
            </button>
            <button
              onClick={() => switchDemoRole("admin", "admin-1")}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                currentRole === "admin"
                  ? "bg-rose-600 text-white font-semibold shadow-sm"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Admin (Vikram)
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 via-primary to-secondary-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-mainText flex items-center gap-1">
                  Job<span className="text-primary-600">Hub</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-subText -mt-1 hidden sm:block">
                  Opportunity Portal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/"
                    ? "text-primary-600 bg-primary-50 font-semibold"
                    : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                }`}
              >
                Home
              </Link>
              <Link
                href="/jobs"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/jobs")
                    ? "text-primary-600 bg-primary-50 font-semibold"
                    : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                }`}
              >
                Find Jobs
              </Link>
              <Link
                href="/companies"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/companies")
                    ? "text-primary-600 bg-primary-50 font-semibold"
                    : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                }`}
              >
                Companies
              </Link>
              <Link
                href="/about"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/about"
                    ? "text-primary-600 bg-primary-50 font-semibold"
                    : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/contact"
                    ? "text-primary-600 bg-primary-50 font-semibold"
                    : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-3">
                {/* Role Specific Action Button */}
                {currentRole === "recruiter" && (
                  <Link
                    href="/recruiter/jobs/new"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-sm transition-all hover:shadow"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Post a Job</span>
                  </Link>
                )}

                {/* Notifications Bell */}
                <Link
                  href="/dashboard/notifications"
                  className="relative p-2.5 text-slate-600 hover:text-primary-600 hover:bg-slate-100 rounded-xl transition"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-3 p-1.5 pl-2 rounded-xl border border-borderLine hover:border-slate-300 hover:bg-slate-50 transition"
                  >
                    <img
                      src={currentUser.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                      alt={currentUser.full_name}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                    />
                    <div className="text-left hidden lg:block pr-1">
                      <p className="text-xs font-semibold text-mainText leading-tight truncate max-w-[120px]">
                        {currentUser.full_name}
                      </p>
                      <p className="text-[11px] text-primary-600 capitalize font-medium">
                        {currentRole.replace("_", " ")}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setUserDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-dropdown border border-borderLine py-2 z-30 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-2.5 border-b border-borderLine">
                          <p className="text-sm font-semibold text-mainText">{currentUser.full_name}</p>
                          <p className="text-xs text-subText truncate">{currentUser.email}</p>
                          <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-indigo-50 text-indigo-700">
                            {currentRole.replace("_", " ")}
                          </span>
                        </div>

                        <div className="py-1">
                          {currentRole === "job_seeker" && (
                            <>
                              <Link
                                href="/dashboard"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                              >
                                <LayoutDashboard className="w-4 h-4 text-slate-400" />
                                <span>Overview Dashboard</span>
                              </Link>
                              <Link
                                href="/dashboard/applications"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                              >
                                <FileText className="w-4 h-4 text-slate-400" />
                                <span>My Applications</span>
                              </Link>
                              <Link
                                href="/dashboard/saved"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                              >
                                <Bookmark className="w-4 h-4 text-slate-400" />
                                <span>Saved Jobs</span>
                              </Link>
                              <Link
                                href="/dashboard/profile"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                              >
                                <User className="w-4 h-4 text-slate-400" />
                                <span>Manage Profile</span>
                              </Link>
                            </>
                          )}

                          {currentRole === "recruiter" && (
                            <>
                              <Link
                                href="/recruiter"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                              >
                                <LayoutDashboard className="w-4 h-4 text-slate-400" />
                                <span>Recruiter Overview</span>
                              </Link>
                              <Link
                                href="/recruiter/jobs"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                              >
                                <Briefcase className="w-4 h-4 text-slate-400" />
                                <span>Manage Jobs & Applicants</span>
                              </Link>
                              <Link
                                href="/recruiter/company"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                              >
                                <Building2 className="w-4 h-4 text-slate-400" />
                                <span>Company Profile</span>
                              </Link>
                            </>
                          )}

                          {currentRole === "admin" && (
                            <>
                              <Link
                                href="/admin"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                              >
                                <ShieldCheck className="w-4 h-4 text-rose-500" />
                                <span>Admin Dashboard</span>
                              </Link>
                              <Link
                                href="/admin/users"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                              >
                                <User className="w-4 h-4 text-slate-400" />
                                <span>Manage Users</span>
                              </Link>
                              <Link
                                href="/admin/jobs"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                              >
                                <Briefcase className="w-4 h-4 text-slate-400" />
                                <span>Moderate Jobs</span>
                              </Link>
                              <Link
                                href="/admin/applications"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                              >
                                <FileText className="w-4 h-4 text-slate-400" />
                                <span>Platform Applications</span>
                              </Link>
                            </>
                          )}
                        </div>

                        <div className="pt-2 border-t border-borderLine">
                          <button
                            onClick={() => {
                              setUserDropdownOpen(false);
                              logout();
                              router.push("/");
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-medium"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-primary-600 hover:bg-slate-50 transition"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-sm transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated && (
              <Link
                href="/dashboard/notifications"
                className="relative p-2 text-slate-600 hover:text-primary-600"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-rose-500 ring-2 ring-white"></span>
                )}
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-primary-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-borderLine bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium ${
                pathname === "/" ? "bg-primary-50 text-primary-600 font-semibold" : "text-slate-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium ${
                pathname.startsWith("/jobs") ? "bg-primary-50 text-primary-600 font-semibold" : "text-slate-700"
              }`}
            >
              Find Jobs
            </Link>
            <Link
              href="/companies"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium ${
                pathname.startsWith("/companies") ? "bg-primary-50 text-primary-600 font-semibold" : "text-slate-700"
              }`}
            >
              Companies
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium ${
                pathname === "/about" ? "bg-primary-50 text-primary-600 font-semibold" : "text-slate-700"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium ${
                pathname === "/contact" ? "bg-primary-50 text-primary-600 font-semibold" : "text-slate-700"
              }`}
            >
              Contact
            </Link>
          </nav>

          {isAuthenticated && currentUser ? (
            <div className="pt-3 border-t border-borderLine space-y-2">
              <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl">
                <img
                  src={currentUser.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                  alt={currentUser.full_name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-mainText">{currentUser.full_name}</p>
                  <p className="text-xs text-primary-600 font-medium capitalize">
                    {currentRole.replace("_", " ")}
                  </p>
                </div>
              </div>

              {currentRole === "job_seeker" && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-center bg-slate-50 hover:bg-primary-50 text-slate-800 text-xs font-semibold rounded-xl"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/applications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-center bg-slate-50 hover:bg-primary-50 text-slate-800 text-xs font-semibold rounded-xl"
                  >
                    Applications
                  </Link>
                  <Link
                    href="/dashboard/saved"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-center bg-slate-50 hover:bg-primary-50 text-slate-800 text-xs font-semibold rounded-xl"
                  >
                    Saved Jobs
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-center bg-slate-50 hover:bg-primary-50 text-slate-800 text-xs font-semibold rounded-xl"
                  >
                    Profile
                  </Link>
                </div>
              )}

              {currentRole === "recruiter" && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/recruiter"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-center bg-slate-50 hover:bg-primary-50 text-slate-800 text-xs font-semibold rounded-xl"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/recruiter/jobs/new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-center bg-primary-600 text-white text-xs font-semibold rounded-xl"
                  >
                    + Post Job
                  </Link>
                  <Link
                    href="/recruiter/jobs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-center bg-slate-50 hover:bg-primary-50 text-slate-800 text-xs font-semibold rounded-xl col-span-2"
                  >
                    Manage Jobs & Applicants
                  </Link>
                </div>
              )}

              {currentRole === "admin" && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-center bg-slate-50 hover:bg-primary-50 text-slate-800 text-xs font-semibold rounded-xl"
                  >
                    Admin Hub
                  </Link>
                  <Link
                    href="/admin/users"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-center bg-slate-50 hover:bg-primary-50 text-slate-800 text-xs font-semibold rounded-xl"
                  >
                    Users
                  </Link>
                </div>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  router.push("/");
                }}
                className="w-full mt-2 py-2.5 text-center text-sm font-semibold text-rose-600 bg-rose-50 rounded-xl"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-borderLine grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-slate-100 rounded-xl"
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-primary-600 rounded-xl"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
