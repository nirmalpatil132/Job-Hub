"use client";

import React from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar */}
        <DashboardSidebar role="recruiter" />

        {/* Main View Area */}
        <div className="flex-1 w-full min-w-0">{children}</div>
      </div>
    </div>
  );
}
