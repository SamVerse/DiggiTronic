import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { BLOGS } from "../src/data/blogs";

// Load .env.local from project root
config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function seed() {
  console.log(`Seeding ${BLOGS.length} blogs...`);

  const rows = BLOGS.map((b) => ({
    slug: b.slug,
    title: b.title,
    category: b.category,
    date: b.date,
    author: b.author,
    read_time: b.readTime,
    excerpt: b.excerpt,
    cover_image: b.coverImage,
    content: b.content,
  }));

  const { error } = await supabase
    .from("blogs")
    .upsert(rows, { onConflict: "slug" }); // safe to re-run — won't duplicate

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log("Done! All blogs inserted.");
}

seed();
