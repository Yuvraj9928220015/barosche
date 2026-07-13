
export const dynamic = "force-static";

const SITE_URL = "https://www.barosche.com";
const API_URL = "http://localhost:5000";

const getRoute = (category = "") => {
  const cat = category.toLowerCase().trim();
  if (cat.includes("earring")) return "/product-category/earrings";
  if (cat.includes("bracelet")) return "/product-category/bracelets";
  if (cat.includes("pendant")) return "/product-category/pendants";
  if (cat.includes("chosen")) return "/product-category/chosen-jewellery";
  if (cat.includes("for today") || cat.includes("fortoday")) return "/product-category/for-today-jewellery";
  if (cat.includes("new")) return "/product-category/new-in";
  if (cat === "men" || cat === "mens" || cat.includes("men pendant")) return "/product-category/mens";
  if (cat === "women" || cat === "womens" || cat.includes("woman pendant")) return "/product-category/womens";
  if (cat.includes("ring")) return "/product-category/rings";
  if (cat.includes("jewellery") || cat.includes("jewelry")) return "/product-category/jewellery";

  return null;
};

export default async function sitemap() {

  const staticPages = [
    { url: `${SITE_URL}/`, priority: 1.0 },
    { url: `${SITE_URL}/product-category/pendants`, priority: 0.9 },
    { url: `${SITE_URL}/product-category/rings`, priority: 0.9 },
    { url: `${SITE_URL}/product-category/earrings`, priority: 0.9 },
    { url: `${SITE_URL}/product-category/bracelets`, priority: 0.9 },
    { url: `${SITE_URL}/product-category/chosen-jewellery`, priority: 0.8 },
    { url: `${SITE_URL}/product-category/for-today-jewellery`, priority: 0.8 },
    { url: `${SITE_URL}/product-category/new-in`, priority: 0.8 },
    { url: `${SITE_URL}/product-category/mens`, priority: 0.8 },
    { url: `${SITE_URL}/product-category/womens`, priority: 0.8 },
    { url: `${SITE_URL}/blogs`, priority: 0.8 },
    { url: `${SITE_URL}/about`, priority: 0.7 },
    { url: `${SITE_URL}/return`, priority: 0.6 },
    { url: `${SITE_URL}/faqs`, priority: 0.6 },
    { url: `${SITE_URL}/privacy`, priority: 0.5 },
    { url: `${SITE_URL}/terms`, priority: 0.5 },
  ].map(({ url, priority }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority,
  }));

  let productPages = [];

  try {
    const res = await fetch(`${API_URL}/api/products`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`API ${res.status}`);

    const products = await res.json();
    const seenSlugs = new Set();

    productPages = products
      .map((product) => {
        if (!product.slug) return null;
        if (seenSlugs.has(product.slug)) return null;
        seenSlugs.add(product.slug);

        const route = getRoute(product.category);
        if (!route) {
          console.warn(`Sitemap: no route mapped for category "${product.category}" (slug: ${product.slug})`);
          return null;
        }

        return {
          url: `${SITE_URL}${route}/${product.slug}`,
          lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        };
      })
      .filter(Boolean);

  } catch (err) {
    console.error("Sitemap product fetch failed:", err);
  }

  let blogPages = [];

  try {
    const res = await fetch(`${API_URL}/api/blogs`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`API ${res.status}`);

    const blogs = await res.json();
    const seenBlogSlugs = new Set();

    blogPages = (Array.isArray(blogs) ? blogs : [])
      .map((blog) => {
        const slug = blog.urlHandle || blog.slug;
        if (!slug) return null;
        if (seenBlogSlugs.has(slug)) return null;
        seenBlogSlugs.add(slug);

        return {
          url: `${SITE_URL}/blogs/${slug}`,
          lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        };
      })
      .filter(Boolean);

  } catch (err) {
    console.error("Sitemap blog fetch failed:", err);
  }

  return [...staticPages, ...productPages, ...blogPages];
}