import { notFound } from "next/navigation";
import JobDetailClient from "./job-detail-client";
import { JOBS, getJobBySlug } from "@/data/jobs";

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();
  return <JobDetailClient job={job} />;
}
