"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJobHub } from "@/lib/context/JobHubContext";
import { useToast } from "@/lib/context/ToastContext";
import { Briefcase, Lock, Mail, ArrowRight, UserCheck, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, switchDemoRole } = useJobHub();
  const { error } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      error("Missing Fields", "Please enter both your email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const ok = login(email);
      setLoading(false);
      if (ok) {
        router.push("/dashboard");
      }
    }, 400);
  };

  const handleQuickDemoLogin = (role: "job_seeker" | "recruiter" | "admin", userId: string) => {
    switchDemoRole(role, userId);
    if (role === "admin") router.push("/admin");
    else if (role === "recruiter") router.push("/recruiter");
    else router.push("/dashboard");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Card Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white shadow-md">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-mainText">
              Job<span className="text-primary-600">Hub</span>
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-mainText">Sign in to your account</h1>
          <p className="text-xs sm:text-sm text-subText">
            Welcome back! Select a demo role or enter your credentials.
          </p>
        </div>

        {/* Main Login Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-6">
          {/* Quick 1-Click Demo Logins for Evaluators */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider text-center">
              Quick 1-Click Demo Logins
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("job_seeker", "user-1")}
                className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-900 text-xs font-semibold text-center transition"
              >
                🎓 Seeker (Rahul)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("recruiter", "rec-1")}
                className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100 text-purple-900 text-xs font-semibold text-center transition"
              >
                💼 Recruiter (Priya)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("admin", "admin-1")}
                className="p-2.5 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-rose-900 text-xs font-semibold text-center transition"
              >
                🛡️ Admin (Vikram)
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-borderLine w-full" />
            <span className="bg-white px-3 text-xs text-slate-400 uppercase font-medium">Or</span>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
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
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
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
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center pt-2 text-xs text-subText">
            Don't have an account yet?{" "}
            <Link href="/register" className="font-bold text-primary-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
