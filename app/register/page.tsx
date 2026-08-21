"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useJobHub } from "@/lib/context/JobHubContext";
import { useToast } from "@/lib/context/ToastContext";
import { UserRole } from "@/types";
import {
  Briefcase,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  GraduationCap,
  Building2,
  CheckCircle2,
} from "lucide-react";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register } = useJobHub();
  const { error } = useToast();

  const initialRole = (searchParams.get("role") as UserRole) || "job_seeker";

  const [role, setRole] = useState<UserRole>(initialRole === "recruiter" ? "recruiter" : "job_seeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      error("Incomplete Details", "Please fill in all mandatory fields.");
      return;
    }

    if (password !== confirmPassword) {
      error("Password Mismatch", "Passwords do not match. Please verify.");
      return;
    }

    if (password.length < 6) {
      error("Weak Password", "Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const ok = register(name, email, role, phone);
      setLoading(false);
      if (ok) {
        if (role === "recruiter") router.push("/recruiter");
        else router.push("/dashboard");
      }
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white shadow-md">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-mainText">
              Job<span className="text-primary-600">Hub</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">Create your free account</h1>
          <p className="text-xs sm:text-sm text-subText">
            Join JobHub to search jobs or post opportunities for talent.
          </p>
        </div>

        {/* Form Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection Tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                I am registering as *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("job_seeker")}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition ${
                    role === "job_seeker"
                      ? "border-primary-600 bg-primary-50/60 ring-2 ring-primary-500/20"
                      : "border-borderLine bg-white hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      role === "job_seeker" ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-mainText">Job Seeker</p>
                    <p className="text-[11px] text-subText">Looking for jobs</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("recruiter")}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition ${
                    role === "recruiter"
                      ? "border-purple-600 bg-purple-50/60 ring-2 ring-purple-500/20"
                      : "border-borderLine bg-white hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      role === "recruiter" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-mainText">Recruiter</p>
                    <p className="text-[11px] text-subText">Hiring talent</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 chars"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center pt-2 text-xs text-subText">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary-600 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Register...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
