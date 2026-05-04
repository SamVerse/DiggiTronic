import LenisScroll from "@/components/lenis-scroll";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlogHero from "@/sections/blog-hero";
import BlogListing from "@/sections/blog-listing";
import { getBlogs } from "@/lib/blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Diggitronic — Insights That Power Digital Growth",
    description:
        "Explore ideas, strategies, and industry insights on branding, SEO, web design, marketing, and technology from the Diggitronic team.",
};

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <>
            <LenisScroll />
            <Navbar />
            <main
                className="relative overflow-x-hidden"
                style={{ background: "#0a0a0a" }}
            >
                <BlogHero />
                <BlogListing blogs={blogs} />
            </main>
            <Footer />
        </>
    );
}
