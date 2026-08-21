import React from "react";
import { ApplicationStatus } from "@/types";
import { Check, Clock, Calendar, CheckCircle2, XCircle } from "lucide-react";

interface ApplicationTrackerProps {
  status: ApplicationStatus;
}

const STEPS: { label: ApplicationStatus; desc: string }[] = [
  { label: "Applied", desc: "Application submitted" },
  { label: "Under Review", desc: "Resume in screening" },
  { label: "Shortlisted", desc: "Selected for next round" },
  { label: "Interview", desc: "Discussion scheduled" },
  { label: "Selected", desc: "Offer released" },
];

export function ApplicationTracker({ status }: ApplicationTrackerProps) {
  if (status === "Rejected") {
    return (
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
          <XCircle className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-rose-900">Application Closed / Not Selected</h4>
          <p className="text-xs text-rose-700 mt-0.5">
            The employer has decided not to proceed with this application at this time.
          </p>
        </div>
      </div>
    );
  }

  const currentStepIndex = STEPS.findIndex((s) => s.label === status);

  return (
    <div className="w-full py-4">
      {/* Step Pipeline for Desktop / Tablet */}
      <div className="relative flex items-center justify-between">
        {/* Background Connecting Bar */}
        <div className="absolute left-4 right-4 top-4 h-1 bg-slate-100 -translate-y-1/2 z-0" />
        
        {/* Active Connecting Bar */}
        <div
          className="absolute left-4 top-4 h-1 bg-primary-600 -translate-y-1/2 z-0 transition-all duration-500"
          style={{
            width: `${Math.max(0, (currentStepIndex / (STEPS.length - 1)) * 100 - 5)}%`,
          }}
        />

        {STEPS.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <div key={step.label} className="relative z-10 flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary-600 text-white shadow-sm ring-4 ring-primary-100"
                    : isCurrent
                    ? "bg-white border-2 border-primary-600 text-primary-600 ring-4 ring-primary-100 shadow-md scale-110"
                    : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : isCurrent ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-600 animate-pulse" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              <div className="mt-2.5 max-w-[80px] sm:max-w-[100px]">
                <p
                  className={`text-xs font-bold leading-tight ${
                    isCurrent
                      ? "text-primary-600"
                      : isCompleted
                      ? "text-slate-800"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-slate-400 hidden sm:block mt-0.5 leading-tight">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
