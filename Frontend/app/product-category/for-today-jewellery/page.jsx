import ForToday from './ForToday';

const PAGE_URL = "https://barosche.com/product-category/for-today-jewellery/";
const OG_IMAGE = "https://barosche.com/logo.png";
const TITLE = "Buy Daily Wear Fine Jewellery for Everyday Use | Barosche";
const DESCRIPTION =
  "Shop everyday fashion gold jewellery for daily wear at Barosche. Discover lightweight, dainty & elegant fine jewellery designed for comfort and modern style.";

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
        alt: "Barosche For Today Jewellery Collection",
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
        alt: "Barosche For Today Jewellery Collection",
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
  return <ForToday />;
}