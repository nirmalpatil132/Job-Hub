"use client";

import React, { useState } from "react";
import { useJobHub } from "@/lib/context/JobHubContext";
import { useToast } from "@/lib/context/ToastContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";

export default function ProfilePage() {
  const { currentUser, updateProfile, education, addEducation, deleteEducation } = useJobHub();
  const { success, error } = useToast();

  // Personal Info Form State
  const [fullName, setFullName] = useState(currentUser?.full_name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [location, setLocation] = useState(currentUser?.location || "");
  const [headline, setHeadline] = useState(currentUser?.headline || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [skills, setSkills] = useState<string[]>(currentUser?.skills || ["JavaScript", "React", "Python", "SQL"]);
  const [newSkill, setNewSkill] = useState("");
  const [resumeName, setResumeName] = useState(currentUser?.resume_name || "Rahul_Sharma_BCA_Resume.pdf");

  // Education Modal
  const [eduModalOpen, setEduModalOpen] = useState(false);
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [gradYear, setGradYear] = useState("2026");
  const [eduDesc, setEduDesc] = useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      full_name: fullName,
      phone,
      location,
      headline,
      bio,
      skills,
      resume_name: resumeName,
    });
  };

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skills.includes(newSkill.trim())) {
      error("Skill exists", "This skill is already on your profile.");
      return;
    }
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleAddEducationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!degree || !institution) {
      error("Missing fields", "Please specify your degree and institution.");
      return;
    }
    if (!currentUser) return;

    addEducation({
      user_id: currentUser.user_id,
      degree,
      institution,
      graduation_year: Number(gradYear) || 2026,
      description: eduDesc,
    });

    setDegree("");
    setInstitution("");
    setEduDesc("");
    setEduModalOpen(false);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
      success("Resume Updated", `${e.target.files[0].name} uploaded.`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">Manage Profile & Resume</h1>
          <p className="text-xs sm:text-sm text-subText mt-1">
            Keep your credentials and work experience updated for prospective employers.
          </p>
        </div>
        <button
          onClick={handleSaveProfile}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-8">
        {/* 1. Personal Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-6">
          <h2 className="text-lg font-bold text-mainText flex items-center gap-2">
            <User className="w-5 h-5 text-primary-600" /> Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address (Registered)
              </label>
              <input
                type="email"
                disabled
                value={currentUser?.email || ""}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                City / Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Pune, Maharashtra"
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Professional Headline & Bio */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-6">
          <h2 className="text-lg font-bold text-mainText flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary-600" /> Professional Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Professional Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Aspiring Full Stack & Python Developer | BCA Graduate"
                className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                About / Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell recruiters about your background, career aspirations, and passion projects..."
                className="w-full px-4 py-3 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Skills Tags Manager */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-6">
          <h2 className="text-lg font-bold text-mainText flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-600" /> Technical Skills
          </h2>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Add a skill (e.g. TypeScript, Docker, SQL)..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-primary-50 hover:text-primary-600 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="p-0.5 rounded-full hover:bg-indigo-200/60 text-indigo-500 hover:text-indigo-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Education History */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-mainText flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary-600" /> Education
            </h2>
            <button
              type="button"
              onClick={() => setEduModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-primary-600 bg-primary-50 hover:bg-primary-100"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Education</span>
            </button>
          </div>

          <div className="space-y-3">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-mainText">{edu.degree}</h4>
                  <p className="text-xs text-subText font-medium">{edu.institution} • Class of {edu.graduation_year}</p>
                  {edu.description && <p className="text-xs text-slate-600 mt-1">{edu.description}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => deleteEducation(edu.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition shrink-0"
                  title="Remove education"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Resume Document */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-6">
          <h2 className="text-lg font-bold text-mainText flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" /> Resume / CV
          </h2>

          <div className="p-5 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-mainText">{resumeName}</p>
                <p className="text-xs text-subText">Supported format: PDF, DOCX (Max 5MB)</p>
              </div>
            </div>

            <label className="cursor-pointer px-4 py-2 rounded-xl text-xs font-bold text-primary-600 bg-white border border-primary-200 hover:bg-primary-50 shadow-sm transition shrink-0">
              <span>Upload New Resume</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md transition"
          >
            Save All Profile Changes
          </button>
        </div>
      </form>

      {/* Add Education Modal */}
      {eduModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-borderLine shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-borderLine">
              <h3 className="text-lg font-bold text-mainText">Add Academic Qualification</h3>
              <button onClick={() => setEduModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEducationSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Degree / Qualification *
                </label>
                <input
                  type="text"
                  required
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="e.g. Bachelor of Computer Applications (BCA)"
                  className="w-full px-4 py-2 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  College / University *
                </label>
                <input
                  type="text"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. SPPU Pune"
                  className="w-full px-4 py-2 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Graduation Year
                </label>
                <input
                  type="number"
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Specialization / Notes (Optional)
                </label>
                <input
                  type="text"
                  value={eduDesc}
                  onChange={(e) => setEduDesc(e.target.value)}
                  placeholder="e.g. Major in Web Dev & DBMS"
                  className="w-full px-4 py-2 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEduModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-sm"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
