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

export const metadata: Metadata = {
  title: "Autolavaggio Diamante | Car Detailing Riccione",
  description: "Cura sartoriale per la tua auto a Riccione. Detailing premium, lavaggio a mano e trattamenti nanotecnologici.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} h-full antialiased dark`}
    >
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
