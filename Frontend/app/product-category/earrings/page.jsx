import Earrings from './Earrings';

const API_BASE = "http://localhost:5000";
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
async function getInitialProducts(category) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(
        `${API_BASE}/api/products?category=${encodeURIComponent(category)}`,
        FETCH_TIMEOUT_MS
      );
      if (!res.ok) throw new Error(`API responded with status ${res.status}`);
      const data = await res.json();
      if (data.success) return data.products || [];
      throw new Error(data.message || "Failed to fetch products");
    } catch (err) {
      console.error(`[BraceletsPage] Attempt ${attempt}/${MAX_RETRIES} failed: ${err.message}`);
      if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt);
    }
  }
  console.error("[BraceletsPage] All retries failed — page will render with empty product list.");
  return [];
}


export const metadata = {
  title: "Shop Elegant Daily Wear Earrings for Women Online",
  description:
    "Buy elegant daily wear earrings for women online. Explore minimal, stylish, and statement designs perfect for everyday wear, office looks, and special occasions.",
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
    title: "Shop Elegant Daily Wear Earrings for Women Online",
    description:
      "Buy elegant daily wear earrings for women online. Explore minimal, stylish, and statement designs perfect for everyday wear, office looks, and special occasions.",
    type: "website",
  },
  icons: {
    icon: "/BaroscheSymbol.png",
  },
};

export default async function Page() {
    const initialProducts = await getInitialProducts("Earrings");
    return <Earrings initialProducts={initialProducts} />;
}