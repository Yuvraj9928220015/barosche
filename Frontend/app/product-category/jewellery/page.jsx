import Jewellery from './Jewellery';

const PAGE_URL = "https://barosche.com/product-category/jewellery/";
const OG_IMAGE = "/Meta-image-1.jpg";
const TITLE = "Buy Semi-Precious Gemstone & Gold Fashion Jewellery Online";
const DESCRIPTION =
  "Shop semi-precious gemstone & gold fashion jewellery online at Barosche. Discover elegant designs in fine silver, gold jewellery & modern accessories.";

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
        alt: "Barosche Jewellery Collection",
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
        alt: "Barosche Jewellery Collection",
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
  return <Jewellery />;
}