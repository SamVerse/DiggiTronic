import { supabase } from "@/lib/supabase";
import type { Blog } from "@/data/blogs";

// Maps DB snake_case row to the Blog interface (camelCase)
function mapRow(row: Record<string, unknown>): Blog {
  return {
    slug:       row.slug as string,
    title:      row.title as string,
    category:   row.category as string,
    date:       row.date as string,
    author:     row.author as string,
    readTime:   row.read_time as string,
    excerpt:    row.excerpt as string,
    coverImage: row.cover_image as string,
    content:    row.content as string,
  };
}

export async function getBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("[lib/blogs] getBlogs error:", error.message);
    return [];
  }

  return (data ?? []).map(mapRow);
}

// Single blog by slug, or null if not found
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // row not found
    console.error("[lib/blogs] getBlogBySlug error:", error.message);
    return null;
  }

  return data ? mapRow(data) : null;
}

// Related blogs: same category first, then others, excluding the current slug
export async function getRelatedBlogs(currentSlug: string, limit = 3): Promise<Blog[]> {
  // Fetch current blog to know its category
  const current = await getBlogBySlug(currentSlug);
  if (!current) return [];

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .neq("slug", currentSlug)
    .order("date", { ascending: false });

  if (error) {
    console.error("[lib/blogs] getRelatedBlogs error:", error.message);
    return [];
  }

  const all = (data ?? []).map(mapRow);
  const sameCategory = all.filter((b) => b.category === current.category);
  const others = all.filter((b) => b.category !== current.category);

  return [...sameCategory, ...others].slice(0, limit);
}
