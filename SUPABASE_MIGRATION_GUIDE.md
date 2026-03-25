# Supabase Project Migration Guide

Complete step-by-step guide to set up a new Supabase project for the DiggiTronic website.
Follow every step in order. Do not skip anything.

---

## Table of Contents

1. [Create the Supabase Project](#step-1--create-the-supabase-project)
2. [Create Storage Buckets](#step-2--create-storage-buckets)
3. [Run the Full SQL Setup](#step-3--run-the-full-sql-setup)
4. [Copy Your New Credentials](#step-4--copy-your-new-credentials)
5. [Update .env.local](#step-5--update-envlocal)
6. [Update next.config.ts](#step-6--update-nextconfigts)
7. [Upload Blog Images](#step-7--upload-blog-images)
8. [Update Image URLs in Seed Data](#step-8--update-image-urls-in-seed-data)
9. [Seed the Blogs](#step-9--seed-the-blogs)
10. [Migrate Existing Data (Optional)](#step-10--migrate-existing-data-optional)
11. [Verify Everything Works](#step-11--verify-everything-works)

---

## Step 1 — Create the Supabase Project

1. Go to https://supabase.com/dashboard
2. Click **New Project**
3. Select your organization (or create one)
4. Fill in:
   - **Project name**: Whatever you want (e.g., `digitronic-prod`)
   - **Database password**: Save this somewhere safe, you won't see it again
   - **Region**: Pick the one closest to your users
5. Click **Create new project**
6. Wait for provisioning to complete (takes ~2 minutes)

---

## Step 2 — Create Storage Buckets

You need 2 buckets. Create them via the dashboard.

### Bucket 1: `blog-images` (PUBLIC)

1. In sidebar, go to **Storage**
2. Click **New Bucket**
3. Name: `blog-images`
4. Toggle **Public bucket** to **ON**
5. Click **Create bucket**

### Bucket 2: `resumes` (PRIVATE)

1. Click **New Bucket** again
2. Name: `resumes`
3. Keep **Public bucket OFF** (private)
4. Click **Create bucket**

> Both buckets must exist BEFORE running the SQL in the next step,
> because the SQL creates policies on `storage.objects` that reference
> these bucket names.

---

## Step 3 — Run the Full SQL Setup

Go to **SQL Editor** (sidebar) → click **New query** → paste the ENTIRE block
below → click **Run**.

This creates all 3 tables, enables Row Level Security, creates all RLS policies,
creates indexes, and sets up storage policies — everything in one shot.

```sql
-- ================================================================
--  DIGITRONIC — COMPLETE DATABASE SETUP
--  Run this ONCE on a fresh Supabase project.
--  Prerequisite: storage buckets "blog-images" and "resumes" must
--  already exist (Step 2).
-- ================================================================


-- ────────────────────────────────────────────────────────────────
-- TABLE 1: blogs
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.blogs (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  category    TEXT NOT NULL,
  date        DATE NOT NULL,
  author      TEXT NOT NULL,
  read_time   TEXT NOT NULL,
  excerpt     TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  content     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_blogs"
  ON public.blogs FOR SELECT TO anon, authenticated
  USING (true);


-- ────────────────────────────────────────────────────────────────
-- TABLE 2: contact_submissions
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  mobile      TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT,
  service     TEXT NOT NULL,
  budget      TEXT CHECK (budget IS NULL OR budget IN (
    '< $500', '$500–1K', '$1K–5K', '$5K–10K', '$10K+'
  )),
  ip_address  TEXT,
  user_agent  TEXT
);

CREATE INDEX ON public.contact_submissions (email);
CREATE INDEX ON public.contact_submissions (created_at DESC);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_contact"
  ON public.contact_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (true);


-- ────────────────────────────────────────────────────────────────
-- TABLE 3: job_applications
-- ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.job_applications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  job_slug      TEXT NOT NULL,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  mobile        TEXT,
  portfolio_url TEXT,
  cover_message TEXT,
  resume_path   TEXT NOT NULL,
  ip_address    TEXT,
  user_agent    TEXT
);

CREATE INDEX ON public.job_applications (job_slug);
CREATE INDEX ON public.job_applications (created_at DESC);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_job_applications"
  ON public.job_applications FOR INSERT TO anon, authenticated
  WITH CHECK (true);


-- ────────────────────────────────────────────────────────────────
-- STORAGE POLICIES
-- ────────────────────────────────────────────────────────────────

-- Anyone can view blog images (public bucket)
CREATE POLICY "public_read_blog_images"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'blog-images');

-- Anyone can upload resumes (private bucket, server-side only via service key)
CREATE POLICY "anon_upload_resumes"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'resumes');
```

**After running, you should see "Success. No rows returned."**

To verify, go to:
- **Table Editor** → you should see `blogs`, `contact_submissions`, `job_applications`
- Click any table → **Policies** tab → you should see the RLS policies listed

---

## Step 4 — Copy Your New Credentials

1. Go to **Settings** (gear icon in sidebar) → **API**
2. You need two values:

| What | Where to find it |
|------|-----------------|
| **Project URL** | Under "Project URL" — looks like `https://abcdefghijk.supabase.co` |
| **Service Role Key** | Under "Project API keys" → `service_role` (click the eye icon to reveal, then copy) |

> IMPORTANT: The service_role key has full access. Never expose it in
> client-side code. It's only used server-side in your API routes.

---

## Step 5 — Update .env.local

Open `.env.local` in your project root and replace the old values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<YOUR-NEW-PROJECT-REF>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<YOUR-NEW-SERVICE-ROLE-KEY>
```

Replace `<YOUR-NEW-PROJECT-REF>` and `<YOUR-NEW-SERVICE-ROLE-KEY>` with
the actual values from Step 4.

---

## Step 6 — Update next.config.ts

Your blog cover images will now be served from Supabase Storage instead of
the local `/public` folder. You need to allow your new Supabase domain in
Next.js image optimization.

Open `next.config.ts` and add your Supabase hostname to `remotePatterns`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "<YOUR-NEW-PROJECT-REF>.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
};

export default nextConfig;
```

Replace `<YOUR-NEW-PROJECT-REF>` with just the subdomain part
(e.g., `abcdefghijk.supabase.co`).

---

## Step 7 — Upload Blog Images

1. Go to **Storage** → click the `blog-images` bucket
2. Click **Upload files**
3. Upload ALL images from your local `public/images/blog/` folder:

```
1.webp
2.png
3.png
4.png
blog5.png
blog6.png
blog7.png
blog8.png
```

4. After uploading, you can get any image's public URL by clicking on it.
   The URL format is:

```
https://<YOUR-NEW-PROJECT-REF>.supabase.co/storage/v1/object/public/blog-images/<filename>
```

---

## Step 8 — Update Image URLs in Seed Data

Open `src/data/blogs.ts`. For each blog entry, you need to update the image
URLs in TWO places:

### A) The `coverImage` field

Replace local paths with Supabase URLs:

| Blog slug | Old `coverImage` | New `coverImage` |
|-----------|------------------|------------------|
| `future-of-digital-branding` | `/images/blog/1.webp` | `https://<REF>.supabase.co/storage/v1/object/public/blog-images/1.webp` |
| `seo-strategies-for-2025` | `/images/blog/2.png` | `https://<REF>.supabase.co/storage/v1/object/public/blog-images/2.png` |
| `building-high-converting-websites` | `/images/blog/3.png` | `https://<REF>.supabase.co/storage/v1/object/public/blog-images/3.png` |
| `power-of-content-marketing` | `/images/blog/4.png` | `https://<REF>.supabase.co/storage/v1/object/public/blog-images/4.png` |
| `ai-transforming-digital-agencies` | `/images/blog/blog5.png` | `https://<REF>.supabase.co/storage/v1/object/public/blog-images/blog5.png` |
| `social-media-strategy-guide` | `/images/blog/blog6.png` | `https://<REF>.supabase.co/storage/v1/object/public/blog-images/blog6.png` |
| `typography-in-web-design` | `/images/blog/blog7.png` | `https://<REF>.supabase.co/storage/v1/object/public/blog-images/blog7.png` |
| `brand-identity-digital-age` | `/images/blog/blog8.png` | `https://<REF>.supabase.co/storage/v1/object/public/blog-images/blog8.png` |

### B) The `<img src="...">` inside the `content` HTML

Each blog has a `<figure>` block in its content with an `<img>` tag. Update
those `src` attributes to the same Supabase URLs as above.

For example, in the first blog:

```
BEFORE:  <img src="/images/blog/1.webp" alt="..." />
AFTER:   <img src="https://<REF>.supabase.co/storage/v1/object/public/blog-images/1.webp" alt="..." />
```

> TIP: Do a find-and-replace in the file:
> - Find: `/images/blog/`
> - Replace: `https://<YOUR-NEW-PROJECT-REF>.supabase.co/storage/v1/object/public/blog-images/`
> This will update ALL image URLs in one go (both coverImage and content).

---

## Step 9 — Seed the Blogs

Run the seed script from your project root:

```bash
npx tsx scripts/seed-blogs.ts
```

Expected output:

```
Seeding 8 blogs...
Done! All blogs inserted.
```

If you see an error:
- `Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY` → Check Step 5
- `relation "public.blogs" does not exist` → You didn't run the SQL from Step 3
- `duplicate key value violates unique constraint` → Blogs already exist, this is fine (upsert handles it)

---

## Step 10 — Migrate Existing Data (Optional)

Skip this if you're starting fresh. Only needed if your OLD Supabase project
has real submissions you want to keep.

### A) Export from old project

Go to the OLD project's **SQL Editor** and run:

```sql
-- Check if there's any data worth migrating
SELECT COUNT(*) AS blog_count FROM blogs;
SELECT COUNT(*) AS contact_count FROM contact_submissions;
SELECT COUNT(*) AS application_count FROM job_applications;
```

If counts > 0 and you want to keep this data:

1. Go to **Table Editor** → select the table
2. Click the **Export** button (top right) → **Export as CSV**
3. Save each CSV file

### B) Import into new project

1. Go to the NEW project's **Table Editor**
2. Select the table → click **Insert** → **Import data from CSV**
3. Upload the CSV

### C) Migrate resume files

1. In the OLD project: **Storage** → `resumes` → download all files
2. In the NEW project: **Storage** → `resumes` → upload all files
   (maintain the same folder structure: `resumes/{jobSlug}/{fileId}-{name}`)

### D) Migrate blog images added after initial setup

If you added new blog images to the old `blog-images` bucket (beyond the
8 seed images), download and re-upload those too.

---

## Step 11 — Verify Everything Works

Start your dev server:

```bash
npm run dev
```

Test each feature:

### A) Blog listing page
- Go to `http://localhost:3000/blogs`
- All 8 blogs should appear with cover images loading correctly
- Try filtering by category

### B) Blog detail page
- Click any blog → detail page should load
- Cover image and in-content images should display
- Related blogs section should show at the bottom

### C) Contact form
- Go to `http://localhost:3000/contact`
- Fill in and submit a test entry
- Check the `contact_submissions` table in Supabase — the row should be there

### D) Job application form
- Go to `http://localhost:3000/careers/frontend-engineer/apply`
  (or any valid slug: `ui-ux-designer`, `seo-strategist`)
- Fill in the form, attach a PDF resume, and submit
- Check in Supabase:
  - `job_applications` table should have the new row
  - `resumes` bucket should have the uploaded file under `resumes/frontend-engineer/`

---

## Quick Reference: What Exists in Supabase

### Tables

| Table | Purpose | RLS Policy |
|-------|---------|------------|
| `blogs` | Blog posts | `public_read_blogs` — anyone can read |
| `contact_submissions` | Contact form entries | `anon_insert_contact` — anyone can insert |
| `job_applications` | Job applications | `anon_insert_job_applications` — anyone can insert |

### Storage Buckets

| Bucket | Public? | Policy | Purpose |
|--------|---------|--------|---------|
| `blog-images` | Yes | `public_read_blog_images` — anyone can read | Blog cover images |
| `resumes` | No | `anon_upload_resumes` — anyone can upload | Job application resumes |

### Environment Variables

| Variable | Where used | Exposed to browser? |
|----------|-----------|-------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `src/lib/supabase.ts` | Yes (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | `src/lib/supabase.ts` | No (server only) |

### API Routes

| Route | Method | What it does |
|-------|--------|-------------|
| `/api/contact` | POST | Validates + inserts contact form submission |
| `/api/apply` | POST | Validates + uploads resume + inserts job application |

### Files That Reference Supabase

| File | Purpose |
|------|---------|
| `src/lib/supabase.ts` | Creates the Supabase client (server-side only) |
| `src/lib/blogs.ts` | Blog query functions (getBlogs, getBlogBySlug, getRelatedBlogs) |
| `src/app/api/contact/route.ts` | Contact form API handler |
| `src/app/api/apply/route.ts` | Job application API handler (with file upload) |
| `scripts/seed-blogs.ts` | One-time blog seeding script |
| `src/data/blogs.ts` | Hardcoded blog data (used only by seed script) |

---

## Adding a New Blog Post (After Setup)

Once everything is set up, adding a new blog is simple:

1. Upload the cover image to `blog-images` bucket in Supabase Storage
2. Copy its public URL
3. Go to **Table Editor** → `blogs` → **Insert row**
4. Fill in all fields (use the Supabase image URL for `cover_image`)
5. For `content`, use this HTML structure:

```html
<p class="blog-intro">Opening paragraph here...</p>

<h2>Section Heading</h2>
<p>Body text...</p>

<figure>
  <img src="SUPABASE_IMAGE_URL" alt="Description" />
  <figcaption>Caption text.</figcaption>
</figure>

<blockquote>
  <p>"Quote text here."</p>
  <cite>-- Author Name</cite>
</blockquote>

<div class="blog-callout">
  <strong>Key Insight:</strong> Callout text here.
</div>
```

6. The blog appears automatically on the site — no code changes or redeployment needed.

---

## Checklist (Print This)

```
SUPABASE MIGRATION CHECKLIST
==============================
[ ]  1.  Create new Supabase project
[ ]  2a. Create bucket: blog-images (public ON)
[ ]  2b. Create bucket: resumes (public OFF)
[ ]  3.  Run full SQL in SQL Editor (tables + RLS + policies + indexes)
[ ]  4.  Copy Project URL and Service Role Key
[ ]  5.  Update .env.local with new credentials
[ ]  6.  Add Supabase hostname to next.config.ts remotePatterns
[ ]  7.  Upload 8 blog images to blog-images bucket
[ ]  8.  Update image URLs in src/data/blogs.ts (find-replace /images/blog/)
[ ]  9.  Run: npx tsx scripts/seed-blogs.ts
[ ]  10. (Optional) Migrate existing data from old project
[ ]  11a. Verify: blog listing loads at /blogs
[ ]  11b. Verify: blog detail + images load
[ ]  11c. Verify: contact form submits successfully
[ ]  11d. Verify: job application + resume upload works
```
