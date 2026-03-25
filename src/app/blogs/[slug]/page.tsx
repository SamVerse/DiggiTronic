import { notFound } from "next/navigation";
import BlogDetailClient from "./blog-detail-client";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/blogs";

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const [blog, relatedBlogs] = await Promise.all([
        getBlogBySlug(slug),
        getRelatedBlogs(slug, 3),
    ]);
    if (!blog) notFound();
    return <BlogDetailClient blog={blog} relatedBlogs={relatedBlogs} />;
}
