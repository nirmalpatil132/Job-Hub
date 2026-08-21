import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/lib/context/ToastContext";
import { JobHubProvider } from "@/lib/context/JobHubContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "JobHub — Discover Opportunities. Build Your Future.",
  description:
    "JobHub connects ambitious job seekers, students, and professionals with leading employers across India. Browse verified IT, Data Science, Design, and Engineering jobs.",
  keywords: "Job portal, internships, fresher jobs, tech jobs Pune, IT jobs, India software jobs, hiring platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-background text-mainText selection:bg-primary-500 selection:text-white">
        <ToastProvider>
          <JobHubProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </JobHubProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
