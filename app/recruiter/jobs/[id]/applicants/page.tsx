import React, { use } from "react";
import { INITIAL_JOBS } from "@/lib/data/mockData";
import { JobApplicantsClient } from "./JobApplicantsClient";

export function generateStaticParams() {
  return INITIAL_JOBS.map((job) => ({
    id: job.id,
  }));
}

export default function JobApplicantsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <JobApplicantsClient id={resolvedParams.id} />;
}
