import Bracelets from './Bracelets';

const API_BASE = "https://api.barosche.com";
const FETCH_TIMEOUT_MS = 15000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

const PAGE_URL = "https://barosche.com/product-category/bracelets/";
const OG_IMAGE = "https://api.barosche.com/uploads/product-1782451784924-120020543.jpg";
const TITLE = "Gold Bracelets for Women & Men | 18K Gold & Minimal Designs";
const DESCRIPTION =
  "Shop modern bracelet designs at Barosche. Find gold bracelets for women, refined men’s styles, and timeless 18K pieces crafted for everyday luxury.";

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
  title: TITLE,
  description: DESCRIPTION,

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Barosche",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE,
        width: 480,
        height: 600,
        alt: "Barosche Bracelets Collection",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    site: "@barosche",
    creator: "@barosche",
    images: [
      {
        url: OG_IMAGE,
        alt: "Barosche Bracelets Collection",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function Page() {
  const initialProducts = await getInitialProducts("Bracelets");
  return <Bracelets initialProducts={initialProducts} />;
}