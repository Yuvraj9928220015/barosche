import ServicesPage from "./OurServices";

const PAGE_URL = "https://barosche.com/our-services/";
const OG_IMAGE = "https://barosche.com/logo.png";
const TITLE = "Custom Jewellery Design & Personalised Jewellery Services";
const DESCRIPTION =
  "Explore custom jewellery design and personalised services, including remaking, resizing, and birthstone jewellery crafted with precision and care.";

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
        alt: "Barosche Custom Jewellery & Personalised Services",
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
        alt: "Barosche Custom Jewellery & Personalised Services",
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
  return <ServicesPage />;
}