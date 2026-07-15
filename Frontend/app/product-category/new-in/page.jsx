import NewIn from './NewIn';

const PAGE_URL = "https://barosche.com/product-category/new-in/";
const OG_IMAGE = "https://barosche.com/logo.png";
const TITLE = "Shop Latest & Trending Jewellery for Women Online | Barosche";
const DESCRIPTION =
  "Shop latest & trending jewellery for women at Barosche. Discover new fashion jewellery, elegant designs & modern accessories crafted for everyday style.";

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
        width: 2048,
        height: 997,
        alt: "Shop Minimalist Luxury, Fine and Diamond Jewellery",
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
        alt: "Shop Minimalist Luxury, Fine and Diamond Jewellery",
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

export default function Page() {
  return <NewIn />;
}