import React, { use } from "react";
import { INITIAL_COMPANIES } from "@/lib/data/mockData";
import { CompanyDetailsClient } from "./CompanyDetailsClient";

export function generateStaticParams() {
  return INITIAL_COMPANIES.map((comp) => ({
    id: comp.id,
  }));
}

export default function CompanyProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <CompanyDetailsClient id={resolvedParams.id} />;
}
