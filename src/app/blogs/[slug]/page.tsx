import { notFound } from "next/navigation";
import BlogDetailClient from "./blog-detail-client";
import { BLOGS, getBlogBySlug } from "@/data/blogs";

export function generateStaticParams() {
    return BLOGS.map((b) => ({ slug: b.slug }));
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);
    if (!blog) notFound();
    return <BlogDetailClient blog={blog} />;
}
