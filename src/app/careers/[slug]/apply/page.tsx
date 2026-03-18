import { notFound } from "next/navigation";
import ApplyClient from "./apply-client";
import { JOBS, getJobBySlug } from "@/data/jobs";

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();
  return <ApplyClient job={job} />;
}
