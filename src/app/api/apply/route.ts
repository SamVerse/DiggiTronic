import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase } from "@/lib/supabase";

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

// Must match slugs in src/data/jobs.ts
const VALID_SLUGS = new Set([
  "frontend-engineer",
  "ui-ux-designer",
  "seo-strategist",
]);

const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_MAX = 2;
const RATE_LIMIT_WINDOW_MS = 300_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

// Strips characters that could cause path traversal or issues in storage paths
function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").toLowerCase();
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many applications submitted. Please wait before trying again." },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const firstName = (formData.get("firstName") as string | null) ?? "";
  const lastName = (formData.get("lastName") as string | null) ?? "";
  const email = (formData.get("email") as string | null) ?? "";
  const mobile = (formData.get("mobile") as string | null) ?? "";
  const portfolio = (formData.get("portfolio") as string | null) ?? "";
  const cover = (formData.get("cover") as string | null) ?? "";
  const jobSlug = (formData.get("jobSlug") as string | null) ?? "";
  const resumeFile = formData.get("resume") as File | null;

  const errors: string[] = [];

  if (!firstName.trim()) errors.push("First name is required.");
  if (!lastName.trim()) errors.push("Last name is required.");
  if (!email.trim() || !email.includes("@") || !email.includes("."))
    errors.push("A valid email address is required.");
  if (!jobSlug || !VALID_SLUGS.has(jobSlug)) errors.push("Invalid job position.");

  if (!resumeFile) {
    errors.push("Resume is required.");
  } else {
    if (resumeFile.size > MAX_FILE_SIZE) errors.push("Resume file exceeds 10 MB limit.");
    if (!ALLOWED_MIME_TYPES.has(resumeFile.type))
      errors.push("Resume must be a PDF, DOC, or DOCX file.");
  }

  if (portfolio.trim()) {
    try {
      new URL(portfolio.trim());
    } catch {
      errors.push("Portfolio URL is not valid.");
    }
  }

  if (firstName.length > 100) errors.push("First name is too long.");
  if (lastName.length > 100) errors.push("Last name is too long.");
  if (email.length > 254) errors.push("Email is too long.");
  if (mobile.length > 30) errors.push("Mobile number is too long.");
  if (portfolio.length > 500) errors.push("Portfolio URL is too long.");
  if (cover.length > 5000) errors.push("Cover message is too long.");

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  const fileId = randomUUID();
  const sanitizedName = sanitizeFilename(resumeFile!.name);
  const storagePath = `resumes/${jobSlug}/${fileId}-${sanitizedName}`;

  const fileBuffer = await resumeFile!.arrayBuffer();

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(storagePath, fileBuffer, {
      contentType: resumeFile!.type,
      upsert: false,
    });

  if (storageError) {
    console.error("[api/apply] Storage upload error:", storageError.message);
    return NextResponse.json(
      { error: "Failed to upload resume. Please try again." },
      { status: 500 }
    );
  }

  const { error: dbError } = await supabase.from("job_applications").insert({
    job_slug: jobSlug,
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    email: email.trim().toLowerCase(),
    mobile: mobile.trim() || null,
    portfolio_url: portfolio.trim() || null,
    cover_message: cover.trim() || null,
    resume_path: storagePath,
    ip_address: ip,
    user_agent: req.headers.get("user-agent") ?? null,
  });

  if (dbError) {
    console.error("[api/apply] Supabase insert error:", dbError.message);
    await supabase.storage.from("resumes").remove([storagePath]);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
