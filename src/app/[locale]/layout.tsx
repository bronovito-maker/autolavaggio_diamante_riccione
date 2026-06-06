import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { StickyMobileCTA } from "@/components/layout/sticky-mobile-cta";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://autolavaggiodiamante.it",
      siteName: "Autolavaggio Diamante",
      images: [
        {
          url: "/images/portfolio/ferrari.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: `https://autolavaggiodiamante.it/${locale === "it" ? "" : locale}`,
      languages: {
        "it": "https://autolavaggiodiamante.it",
        "en": "https://autolavaggiodiamante.it/en",
        "es": "https://autolavaggiodiamante.it/es",
        "fr": "https://autolavaggiodiamante.it/fr",
        "de": "https://autolavaggiodiamante.it/de",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  // LocalBusiness Schema with aggregateRating for Trust and GEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    "name": "Autolavaggio Diamante",
    "image": "https://autolavaggiodiamante.it/images/portfolio/ferrari.jpg",
    "@id": "https://autolavaggiodiamante.it",
    "url": "https://autolavaggiodiamante.it",
    "telephone": "+393291610065",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Viale Portofino, 51",
      "addressLocality": "Riccione",
      "postalCode": "47838",
      "addressRegion": "RN",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.004123,
      "longitude": 12.656789
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "19:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "08:00",
        "closes": "13:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/p/Autolavaggio-Diamante-Riccione-100065485749202/",
      "https://www.instagram.com/autolavaggiodiamantericcione/"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "220"
    }
  };

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col pb-20 md:pb-0">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
          <StickyMobileCTA />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
