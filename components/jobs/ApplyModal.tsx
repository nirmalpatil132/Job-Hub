"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Job } from "@/types";
import { useJobHub } from "@/lib/context/JobHubContext";
import confetti from "canvas-confetti";
import {
  X,
  Send,
  UploadCloud,
  CheckCircle2,
  FileText,
  Building,
  MapPin,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface ApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplyModal({ job, isOpen, onClose }: ApplyModalProps) {
  const router = useRouter();
  const { currentUser, isAuthenticated, applyForJob, hasApplied } = useJobHub();

  const [phone, setPhone] = useState(currentUser?.phone || "+91 98765 43210");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeName, setResumeName] = useState(currentUser?.resume_name || "Rahul_Sharma_BCA_Resume.pdf");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  if (!isOpen) return null;

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!isAuthenticated || !currentUser) {
      setValidationError("You must be logged in to apply.");
      return;
    }

    if (!phone || phone.trim().length < 8) {
      setValidationError("Please provide a valid contact phone number.");
      return;
    }

    if (!coverLetter || coverLetter.trim().length < 20) {
      setValidationError("Please write a brief note or cover letter (min 20 characters).");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = applyForJob(job.id, coverLetter, phone, `/resumes/${resumeName}`);
      setIsSubmitting(false);

      if (res.success) {
        setIsSuccess(true);
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {}
      } else {
        setValidationError(res.message);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-borderLine p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="border-b border-borderLine pb-4 mb-6 pr-8">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-primary-50 text-primary-700 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Applying for Position
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-mainText">{job.title}</h2>
              <div className="flex items-center gap-3 text-xs text-subText mt-1">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" /> {job.company_name}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {job.location}
                </span>
              </div>
            </div>

            {validationError && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{validationError}</span>
              </div>
            )}

            {!isAuthenticated ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-mainText">Sign In Required</h3>
                <p className="text-sm text-subText max-w-sm mx-auto">
                  Please sign in or create an account to apply for jobs and track your application progress.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <Link
                    href="/login"
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-sm"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
                  >
                    Register
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Applicant Info Summary */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-borderLine flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-mainText">{currentUser?.full_name}</p>
                    <p className="text-subText">{currentUser?.email}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white font-medium text-slate-600 border border-slate-200 text-[11px]">
                    Verified Seeker
                  </span>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>

                {/* Resume Section */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Resume Document *
                  </label>
                  <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 hover:bg-slate-50 flex items-center justify-between gap-3 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-mainText truncate max-w-[200px] sm:max-w-xs">
                          {resumeName}
                        </p>
                        <p className="text-[11px] text-subText">PDF / DOCX format</p>
                      </div>
                    </div>
                    <label className="cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold text-primary-600 bg-white border border-primary-200 hover:bg-primary-50 shadow-sm shrink-0">
                      <span>Change</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleSimulatedFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Cover Letter / Note to Recruiter *
                    </label>
                    <span className="text-[11px] text-slate-400">{coverLetter.length} chars</span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Describe why you are a great fit for this position and mention relevant projects or skills..."
                    className="w-full px-4 py-3 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg disabled:opacity-50 transition flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-mainText">Application Submitted!</h2>
              <p className="text-sm text-subText max-w-sm mx-auto mt-1.5">
                Your application for <strong className="text-mainText">{job.title}</strong> at {job.company_name} has been sent successfully.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-borderLine text-left text-xs space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-subText">Status:</span>
                <span className="font-semibold text-blue-600">Applied</span>
              </div>
              <div className="flex justify-between">
                <span className="text-subText">Candidate:</span>
                <span className="font-semibold text-mainText">{currentUser?.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-subText">Resume:</span>
                <span className="font-semibold text-mainText">{resumeName}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                onClick={() => {
                  onClose();
                  router.push("/dashboard/applications");
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-md transition"
              >
                Track Application
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              >
                Back to Jobs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
