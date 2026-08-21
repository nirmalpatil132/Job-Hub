"use client";

import React, { useState } from "react";
import { useJobHub } from "@/lib/context/JobHubContext";
import { formatRelativeDate } from "@/lib/utils";
import { UserRole } from "@/types";
import {
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  ShieldCheck,
  Building2,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";

export default function AdminUsersPage() {
  const { profiles, toggleUserStatus } = useJobHub();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = profiles.filter((user) => {
    const matchRole = roleFilter === "All" || user.role === roleFilter;
    const matchSearch =
      user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      (user.location || "").toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 inline-block mb-1">
            User Directory & Access
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">Platform User Management</h1>
          <p className="text-xs sm:text-sm text-subText mt-1">
            Audit registered job seekers, company recruiters, and system administrators.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-borderLine shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full sm:w-80 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, city..."
            className="w-full bg-transparent text-xs text-mainText placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {["All", "job_seeker", "recruiter", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                roleFilter === r
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {r === "All" ? "All Users" : r.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-borderLine shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-borderLine text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-4 px-6">User / Profile</th>
                <th className="py-4 px-4">Role</th>
                <th className="py-4 px-4">Location</th>
                <th className="py-4 px-4">Account Status</th>
                <th className="py-4 px-4">Registered</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                        alt={user.full_name}
                        className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-mainText">{user.full_name}</p>
                        <p className="text-subText text-[11px]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold capitalize ${
                        user.role === "admin"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : user.role === "recruiter"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      }`}
                    >
                      {user.role === "admin" ? (
                        <ShieldCheck className="w-3 h-3" />
                      ) : user.role === "recruiter" ? (
                        <Building2 className="w-3 h-3" />
                      ) : (
                        <GraduationCap className="w-3 h-3" />
                      )}
                      <span>{user.role.replace("_", " ")}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{user.location || "India"}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{formatRelativeDate(user.created_at)}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => toggleUserStatus(user.user_id)}
                      className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-primary-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
