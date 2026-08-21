import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(min: number, max: number, jobType?: string): string {
  if (!min && !max) return "Competitive";
  
  if (jobType === "Internship") {
    if (min && max && min !== max) {
      return `₹${min.toLocaleString("en-IN")} - ₹${max.toLocaleString("en-IN")} / mo`;
    }
    return `₹${(min || max).toLocaleString("en-IN")} / mo`;
  }

  // Annual salary in Lakhs or INR
  const formatLakhs = (val: number) => {
    if (val >= 100000) {
      const lpa = (val / 100000).toFixed(1).replace(/\.0$/, "");
      return `₹${lpa} LPA`;
    }
    return `₹${val.toLocaleString("en-IN")}`;
  };

  if (min && max && min !== max) {
    return `${formatLakhs(min)} - ${formatLakhs(max)}`;
  }
  return formatLakhs(min || max);
}

export function formatRelativeDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "Recently";
  }
}

export function calculateProfileCompletion(profile: any, educationCount = 0): { percentage: number; missingFields: string[] } {
  if (!profile) return { percentage: 0, missingFields: [] };

  const fields = [
    { key: "full_name", label: "Full Name", weight: 15 },
    { key: "email", label: "Email Address", weight: 15 },
    { key: "phone", label: "Phone Number", weight: 15 },
    { key: "location", label: "Location", weight: 15 },
    { key: "headline", label: "Professional Headline", weight: 15 },
    { key: "skills", label: "Skills (at least 3)", weight: 10, check: (p: any) => p.skills && p.skills.length >= 3 },
    { key: "resume_name", label: "Resume Upload", weight: 15 },
  ];

  let score = 0;
  const missing: string[] = [];

  for (const field of fields) {
    if (field.check ? field.check(profile) : Boolean(profile[field.key])) {
      score += field.weight;
    } else {
      missing.push(field.label);
    }
  }

  if (educationCount > 0) {
    score = Math.min(100, score);
  } else {
    missing.push("Education History");
  }

  return {
    percentage: Math.min(100, score),
    missingFields: missing,
  };
}
