import React, { use } from "react";
import { INITIAL_JOBS } from "@/lib/data/mockData";
import { EditJobClient } from "./EditJobClient";

export function generateStaticParams() {
  return INITIAL_JOBS.map((job) => ({
    id: job.id,
  }));
}

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <EditJobClient id={resolvedParams.id} />;
}
