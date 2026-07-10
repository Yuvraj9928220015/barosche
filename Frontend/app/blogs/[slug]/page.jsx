// app/blogs/[slug]/page.js
import BlogSlugClient from "./BlogSlugClient";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function generateStaticParams() {
  try {
    console.log("🔍 [blogs] API_URL:", API_URL);

    if (!API_URL) {
      console.log("⚠️ [blogs] API_URL missing, sirf placeholder return ho raha hai");
      return [{ slug: "placeholder" }];
    }

    const res = await fetch(`${API_URL}/api/blogs`, { cache: "no-store" });
    console.log("🔍 [blogs] API response status:", res.status);

    if (!res.ok) {
      return [{ slug: "placeholder" }];
    }

    const blogs = await res.json();
    console.log("🔍 [blogs] Total blogs mile:", Array.isArray(blogs) ? blogs.length : "not an array");

    if (!Array.isArray(blogs) || blogs.length === 0) {
      return [{ slug: "placeholder" }];
    }

    blogs.forEach((blog) => {
      const s = blog.urlHandle || blog.slug;
      if (!s || typeof s !== "string" || s.trim().length === 0) {
        console.log("❌ [blogs] Slug missing is blog mein — id:", blog._id, "| title:", blog.title);
      }
    });

    const validSlugs = blogs
      .map((blog) => blog.urlHandle || blog.slug)
      .filter((slug) => typeof slug === "string" && slug.trim().length > 0)
      .map((slug) => ({ slug: slug.trim() }));

    const uniqueSlugs = Array.from(
      new Map(validSlugs.map((item) => [item.slug, item])).values()
    );

    return [{ slug: "placeholder" }, ...uniqueSlugs];
  } catch (error) {
    console.error("[blogs] generateStaticParams error:", error);
    return [{ slug: "placeholder" }];
  }
}

export default function BlogSlugPage() {
  return <BlogSlugClient />;
}