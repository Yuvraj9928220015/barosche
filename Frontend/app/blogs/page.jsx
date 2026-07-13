import BlogPage from './BlogPage';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const FETCH_TIMEOUT_MS = 15000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function getInitialBlogs() {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(`${BACKEND_URL}/api/blogs`, FETCH_TIMEOUT_MS);
      if (!res.ok) throw new Error(`API responded with status ${res.status}`);
      const data = await res.json();
      const blogs = Array.isArray(data) ? data : [];
      return blogs.filter((blog) => (blog.category || "Blog") === "Blog");
    } catch (err) {
      console.error(`[BlogPage] Attempt ${attempt}/${MAX_RETRIES} failed: ${err.message}`);
      if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt);
    }
  }
  console.error("[BlogPage] All retries failed — page will render with empty blog list.");
  return [];
}

export const metadata = {
  title: "Latest Insights on Fashion, Jewellery & Lifestyle Trends | Blog",
  description:
    "Explore our blogs for the latest updates, fashion inspiration, jewellery trends, styling tips & lifestyle insights. Stay ahead with expert ideas & timeless elegance from Barosche.",
  keywords: [
    "Barosche Jewellery",
    "About Barosche",
    "Luxury Jewellery",
    "Diamond Jewellery",
    "Gold Jewellery",
    "Custom Jewellery",
    "Fine Jewellery"
  ],
  openGraph: {
    title: "Latest Insights on Fashion, Jewellery & Lifestyle Trends | Blog",
    description:
      "Explore our blogs for the latest updates, fashion inspiration, jewellery trends, styling tips & lifestyle insights. Stay ahead with expert ideas & timeless elegance from Barosche.",
    type: "website",
  },
};

export default async function Page() {
  const initialBlogs = await getInitialBlogs();
  return <BlogPage initialBlogs={initialBlogs} />;
}