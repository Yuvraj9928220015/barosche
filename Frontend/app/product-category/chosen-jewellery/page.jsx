import Chosen from './Chosen';

const PAGE_URL = "https://barosche.com/product-category/chosen-jewellery/";
const OG_IMAGE = "https://api.barosche.com/uploads/product-1780743945301-64086007.webp";
const TITLE = "Buy Fine & Designer Jewellery Gifts for Her Online";
const DESCRIPTION =
  "Buy fine jewellery gifts for her online at Barosche. Explore gold & designer jewellery for special occasions, perfect for wife & girlfriend gifting.";

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
        alt: "Barosche Chosen Jewellery Collection",
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
        alt: "Barosche Chosen Jewellery Collection",
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
  return <Chosen />;
}