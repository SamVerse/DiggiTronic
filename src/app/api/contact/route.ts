import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";



// 3 submissions per IP per 60 seconds.
// Resets on server restart — sufficient for a low-traffic lead site.
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60_000;

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

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait before trying again." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const firstName = typeof body.firstName === "string" ? body.firstName : "";
  const lastName = typeof body.lastName === "string" ? body.lastName : "";
  const mobile = typeof body.mobile === "string" ? body.mobile : "";
  const email = typeof body.email === "string" ? body.email : "";
  const company = typeof body.company === "string" ? body.company : "";
  const service = typeof body.service === "string" ? body.service : "";


  const errors: string[] = [];
  if (!firstName.trim()) errors.push("First name is required.");
  if (!lastName.trim()) errors.push("Last name is required.");
  if (!mobile.trim()) errors.push("Mobile number is required.");
  if (!email.trim() || !email.includes("@") || !email.includes("."))
    errors.push("A valid email address is required.");
  if (!service.trim()) errors.push("Service description is required.");


  if (firstName.length > 100) errors.push("First name is too long.");
  if (lastName.length > 100) errors.push("Last name is too long.");
  if (mobile.length > 30) errors.push("Mobile number is too long.");
  if (email.length > 254) errors.push("Email address is too long.");
  if (company.length > 200) errors.push("Company name is too long.");
  if (service.length > 2000) errors.push("Service description is too long.");

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  const { error: dbError } = await supabase.from("contact_submissions").insert({
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    mobile: mobile.trim(),
    email: email.trim().toLowerCase(),
    company: company.trim() || null,
    service: service.trim(),

    ip_address: ip,
    user_agent: req.headers.get("user-agent") ?? null,
  });

  if (dbError) {
    console.error("[api/contact] Supabase insert error:", dbError.message);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, url: process.env.NEXT_PUBLIC_SUPABASE_URL }, { status: 200 });
}
