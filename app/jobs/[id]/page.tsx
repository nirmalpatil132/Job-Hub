import React, { use } from "react";
import { INITIAL_JOBS } from "@/lib/data/mockData";
import { JobDetailsClient } from "./JobDetailsClient";

export function generateStaticParams() {
  return INITIAL_JOBS.map((job) => ({
    id: job.id,
  }));
}

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <JobDetailsClient id={resolvedParams.id} />;
}
