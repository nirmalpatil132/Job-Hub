"use client";

import React, { useState } from "react";
import { useJobHub } from "@/lib/context/JobHubContext";
import { useToast } from "@/lib/context/ToastContext";
import { Building2, Globe, MapPin, Users, FileText, Save, Sparkles } from "lucide-react";

export default function RecruiterCompanyPage() {
  const { currentUser, companies, updateCompany } = useJobHub();
  const { success } = useToast();

  const recruiterId = currentUser?.user_id || "rec-1";
  const userCompany =
    companies.find((c) => c.recruiter_id === recruiterId) || companies[0];

  const [name, setName] = useState(userCompany?.name || "TechNova Solutions");
  const [logoUrl, setLogoUrl] = useState(
    userCompany?.logo_url || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150"
  );
  const [industry, setIndustry] = useState(userCompany?.industry || "IT & Software");
  const [location, setLocation] = useState(userCompany?.location || "Pune, Maharashtra");
  const [website, setWebsite] = useState(userCompany?.website || "https://technova-demo.io");
  const [companySize, setCompanySize] = useState(userCompany?.company_size || "250-500 employees");
  const [description, setDescription] = useState(
    userCompany?.description ||
      "TechNova Solutions is a premier digital engineering firm specializing in cloud-native platforms, AI enablement, and modern web architectures."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userCompany) {
      updateCompany(userCompany.id, {
        name,
        logo_url: logoUrl,
        industry,
        location,
        website,
        company_size: companySize,
        description,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-mainText">Company Profile</h1>
          <p className="text-xs sm:text-sm text-subText mt-1">
            Configure how your company appears on job cards and the public employer directory.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm shadow-md transition shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Company Info</span>
        </button>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-borderLine shadow-subtle space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Company Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Company Legal / Brand Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Industry Domain *
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-borderLine bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            >
              <option value="IT & Software">IT & Software</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Engineering">Engineering</option>
              <option value="Customer Support">Customer Support</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Headquarters / Primary Office *
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

          {/* Company Size */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Company Employee Size
            </label>
            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-borderLine bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            >
              <option value="1-10 employees">1-10 employees (Startup)</option>
              <option value="11-50 employees">11-50 employees (Small)</option>
              <option value="51-200 employees">51-200 employees (Mid-sized)</option>
              <option value="250-500 employees">250-500 employees (Growing)</option>
              <option value="500-1000 employees">500-1000 employees (Large)</option>
              <option value="1000+ employees">1000+ employees (Enterprise)</option>
            </select>
          </div>

          {/* Website */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Official Website URL
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourcompany.com"
              className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>

          {/* Logo URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Logo Image URL
            </label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            About Company / Overview *
          </label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-borderLine text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md transition"
          >
            Update Company Profile
          </button>
        </div>
      </form>
    </div>
  );
}
