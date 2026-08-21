"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useJobHub } from "@/lib/context/JobHubContext";
import { useToast } from "@/lib/context/ToastContext";
import { JobType, WorkMode } from "@/types";
import { JOB_CATEGORIES } from "@/lib/data/mockData";
import {
  Briefcase,
  Building2,
  MapPin,
  IndianRupee,
  Sparkles,
  Plus,
  X,
  Send,
  ArrowLeft,
} from "lucide-react";

export default function PostJobPage() {
  const router = useRouter();
  const { currentUser, companies, createJob } = useJobHub();
  const { error } = useToast();

  const recruiterId = currentUser?.user_id || "rec-1";
  const userCompany =
    companies.find((c) => c.recruiter_id === recruiterId) || companies[0];

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("IT & Software");
  const [jobType, setJobType] = useState<JobType>("Full Time");
  const [workMode, setWorkMode] = useState<WorkMode>("Hybrid");
  const [location, setLocation] = useState("Pune, Maharashtra");
  const [salaryMin, setSalaryMin] = useState("500000");
  const [salaryMax, setSalaryMax] = useState("850000");
  const [experience, setExperience] = useState("1–3 years");
  const [description, setDescription] = useState("");
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    "Design and develop scalable web components\nWrite unit and integration tests\nParticipate in sprint planning and code reviews"
  );
  const [requirementsText, setRequirementsText] = useState(
    "Bachelor's degree in Computer Science, BCA or related field\nSolid understanding of web protocols and REST APIs\nExperience with Git version control"
  );
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Node.js", "SQL"]);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (!title.trim() || !description.trim() || skills.length === 0) {
      error("Incomplete Form", "Please provide a title, description, and at least one skill.");
      return;
    }

    setLoading(true);

    const responsibilities = responsibilitiesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const requirements = requirementsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    setTimeout(() => {
      createJob({
        recruiter_id: recruiterId,
        company_id: userCompany?.id || "comp-1",
        company_name: userCompany?.name || "TechNova Solutions",
        company_logo: userCompany?.logo_url || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150",
        company_location: userCompany?.location || location,
        title: title.trim(),
        category,
        job_type: jobType,
        work_mode: workMode,
        location: location.trim(),
        salary_min: Number(salaryMin) || 0,
        salary_max: Number(salaryMax) || 0,
        experience,
        description: description.trim(),
        responsibilities,
        requirements,
        skills,
        status: "Active",
      });

      setLoading(false);
      router.push("/recruiter/jobs");
    }, 500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary-600 mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">Publish a New Job Listing</h1>
          <p className="text-xs sm:text-sm text-subText mt-0.5">
            Fill out the details below to publish your opening to hundreds of active candidates.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-borderLine shadow-subtle space-y-8">
        {/* Basic Job Details */}
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
                placeholder="e.g. Full Stack Developer (React & Node)"
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
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
                Job Type *
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Work Mode *
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as WorkMode)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              >
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Experience Level *
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              >
                <option value="Fresher">Fresher (0 years)</option>
                <option value="0–1 years">0–1 years</option>
                <option value="1–3 years">1–3 years</option>
                <option value="3+ years">3+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Pune, Maharashtra"
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Min Salary (₹)
                </label>
                <input
                  type="number"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Max Salary (₹)
                </label>
                <input
                  type="number"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Required */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-mainText flex items-center gap-2 pb-2 border-b border-borderLine">
            <Sparkles className="w-4 h-4 text-primary-600" /> Required Skills & Tags *
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="Type skill and press enter (e.g. React, Next.js, Python)..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-primary-50 text-slate-700 text-xs font-bold"
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

        {/* Detailed Descriptions */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-mainText flex items-center gap-2 pb-2 border-b border-borderLine">
            <Building2 className="w-4 h-4 text-primary-600" /> Job Description & Requirements
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Job Description / Overview *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the mission, day-to-day impact, and team structure for this position..."
              className="w-full px-4 py-3 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Key Responsibilities (One per line)
              </label>
              <textarea
                rows={4}
                value={responsibilitiesText}
                onChange={(e) => setResponsibilitiesText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Candidate Qualifications (One per line)
              </label>
              <textarea
                rows={4}
                value={requirementsText}
                onChange={(e) => setRequirementsText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
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
            disabled={loading}
            className="px-8 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md hover:shadow-lg disabled:opacity-50 transition flex items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Publish Job Now</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
