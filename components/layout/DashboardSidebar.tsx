"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useJobHub } from "@/lib/context/JobHubContext";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Bookmark,
  User,
  Bell,
  Settings,
  LogOut,
  Building2,
  PlusCircle,
  Users,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";

interface DashboardSidebarProps {
  role?: "job_seeker" | "recruiter" | "admin";
}

interface SidebarLink {
  href: string;
  label: string;
  icon: any;
  exact?: boolean;
  badge?: number;
}

export function DashboardSidebar({ role: forcedRole }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, currentRole, logout, unreadNotificationsCount } = useJobHub();

  const role = forcedRole || currentRole;

  const seekerLinks: SidebarLink[] = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/jobs", label: "Find Jobs", icon: Briefcase },
    { href: "/dashboard/applications", label: "Applications", icon: FileText },
    { href: "/dashboard/saved", label: "Saved Jobs", icon: Bookmark },
    { href: "/dashboard/profile", label: "Profile & Resume", icon: User },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell, badge: unreadNotificationsCount },
  ];

  const recruiterLinks: SidebarLink[] = [
    { href: "/recruiter", label: "Recruiter Overview", icon: LayoutDashboard, exact: true },
    { href: "/recruiter/jobs", label: "Manage Jobs", icon: Briefcase },
    { href: "/recruiter/jobs/new", label: "Post a Job", icon: PlusCircle },
    { href: "/recruiter/company", label: "Company Profile", icon: Building2 },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell, badge: unreadNotificationsCount },
  ];

  const adminLinks: SidebarLink[] = [
    { href: "/admin", label: "Platform Overview", icon: LayoutDashboard, exact: true },
    { href: "/admin/users", label: "Manage Users", icon: Users },
    { href: "/admin/jobs", label: "Moderate Jobs", icon: Briefcase },
    { href: "/admin/applications", label: "All Applications", icon: FileText },
  ];

  const links: SidebarLink[] = role === "admin" ? adminLinks : role === "recruiter" ? recruiterLinks : seekerLinks;

  const isLinkActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || (href !== "/dashboard" && href !== "/recruiter" && href !== "/admin" && pathname.startsWith(href));
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white rounded-3xl border border-borderLine p-5 shadow-subtle flex flex-col justify-between">
      <div>
        {/* User Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
          <img
            src={currentUser?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
            alt={currentUser?.full_name || "User"}
            className="w-11 h-11 rounded-xl object-cover ring-2 ring-white shadow-sm shrink-0"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-mainText truncate leading-tight">
              {currentUser?.full_name || "Guest User"}
            </p>
            <span className="inline-block mt-0.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary-50 text-primary-700">
              {role.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* Links Navigation */}
        <nav className="space-y-1">
          {links.map((link) => {
            const active = isLinkActive(link.href, link.exact);
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-primary-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                  <span>{link.label}</span>
                </div>
                {Boolean(link.badge && link.badge > 0) && (
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      active ? "bg-white text-primary-600" : "bg-rose-500 text-white"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="pt-6 mt-6 border-t border-borderLine">
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
