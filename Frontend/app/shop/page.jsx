import Shop from './Shop';

const PAGE_URL = "https://barosche.com/shop/";
const OG_IMAGE = "https://api.barosche.com/uploads/product-1782730319023-201434062.jpg";
const TITLE = "Buy Fine Lab-Grown Diamond & Gemstone Jewellery Online";
const DESCRIPTION =
  "Shop jewellery online with lab-grown diamond & gemstone designs. Find stylish, elegant pieces for women, perfect for daily wear & gifting.";

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
        alt: "Barosche Shop Collection",
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
        alt: "Barosche Shop Collection",
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
  return <Shop />;
}