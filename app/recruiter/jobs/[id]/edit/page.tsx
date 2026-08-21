"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useJobHub } from "@/lib/context/JobHubContext";
import { useToast } from "@/lib/context/ToastContext";
import { JobType, WorkMode, JobStatus } from "@/types";
import { JOB_CATEGORIES } from "@/lib/data/mockData";
import {
  Briefcase,
  Building2,
  MapPin,
  IndianRupee,
  Sparkles,
  Plus,
  X,
  Save,
  ArrowLeft,
} from "lucide-react";

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const { getJobById, updateJob } = useJobHub();
  const { error, success } = useToast();

  const job = getJobById(id);

  const [title, setTitle] = useState(job?.title || "");
  const [category, setCategory] = useState(job?.category || "IT & Software");
  const [jobType, setJobType] = useState<JobType>(job?.job_type || "Full Time");
  const [workMode, setWorkMode] = useState<WorkMode>(job?.work_mode || "Hybrid");
  const [status, setStatus] = useState<JobStatus>(job?.status || "Active");
  const [location, setLocation] = useState(job?.location || "");
  const [salaryMin, setSalaryMin] = useState(job?.salary_min?.toString() || "500000");
  const [salaryMax, setSalaryMax] = useState(job?.salary_max?.toString() || "850000");
  const [experience, setExperience] = useState(job?.experience || "1–3 years");
  const [description, setDescription] = useState(job?.description || "");
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    job?.responsibilities?.join("\n") || ""
  );
  const [requirementsText, setRequirementsText] = useState(
    job?.requirements?.join("\n") || ""
  );
  const [skills, setSkills] = useState<string[]>(job?.skills || []);
  const [newSkill, setNewSkill] = useState("");

  if (!job) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-borderLine space-y-4">
        <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
        <h3 className="text-lg font-bold text-mainText">Job Not Found</h3>
        <button
          onClick={() => router.push("/recruiter/jobs")}
          className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs"
        >
          Back to Manage Jobs
        </button>
      </div>
    );
  }

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const responsibilities = responsibilitiesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const requirements = requirementsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    updateJob(job.id, {
      title,
      category,
      job_type: jobType,
      work_mode: workMode,
      status,
      location,
      salary_min: Number(salaryMin) || 0,
      salary_max: Number(salaryMax) || 0,
      experience,
      description,
      responsibilities,
      requirements,
      skills,
    });

    router.push("/recruiter/jobs");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary-600 mb-2 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Jobs
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">Edit Job Posting</h1>
        <p className="text-xs sm:text-sm text-subText mt-0.5">
          Update requirements, compensation, or active status for this vacancy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-borderLine shadow-subtle space-y-8">
        <div className="space-y-4">
          <h2 className="text-base font-bold text-mainText flex items-center gap-2 pb-2 border-b border-borderLine">
            <Briefcase className="w-4 h-4 text-primary-600" /> Basic Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine bg-white text-sm focus:outline-none"
              >
                {JOB_CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Listing Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobStatus)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine bg-white text-sm focus:outline-none"
              >
                <option value="Active">Active (Accepting Applications)</option>
                <option value="Closed">Closed (Hidden)</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Job Type
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine bg-white text-sm focus:outline-none"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Work Mode
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine bg-white text-sm focus:outline-none"
              >
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Location
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine bg-white text-sm focus:outline-none"
              >
                <option value="Fresher">Fresher (0 years)</option>
                <option value="0–1 years">0–1 years</option>
                <option value="1–3 years">1–3 years</option>
                <option value="3+ years">3+ years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-mainText flex items-center gap-2 pb-2 border-b border-borderLine">
            <Sparkles className="w-4 h-4 text-primary-600" /> Required Skills
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Add skill..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-100"
              >
                <span>{s}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(s)}
                  className="p-0.5 rounded-full hover:bg-primary-200/60"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Job Description
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-borderLine text-sm focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-borderLine">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
