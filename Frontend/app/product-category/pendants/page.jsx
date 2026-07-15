import Pendant from './Pendant';

const API_BASE = "https://api.barosche.com";
const FETCH_TIMEOUT_MS = 15000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

const PAGE_URL = "https://barosche.com/product-category/pendants/";
const OG_IMAGE = "https://api.barosche.com/uploads/product-1782453326085-355591573.jpg";
const TITLE = "Shop Stylish Minimal & Gemstone Daily-Wear Pendants for Women";
const DESCRIPTION =
  "Shop pendants jewellery online with elegant, minimal, and gemstone designs. Perfect for daily wear, gifting, and adding effortless style to any outfit.";

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
        alt: "Barosche Pendants Collection",
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
        alt: "Barosche Pendants Collection",
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
  const initialProducts = await getInitialProducts("Pendant");
  return <Pendant initialProducts={initialProducts} />;
}