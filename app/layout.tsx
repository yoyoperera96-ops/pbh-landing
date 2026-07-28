import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const siteUrl = "https://www.penabarcelonistalahabana.example.cu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.anniversaryLabel}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "Peña Barcelonista de La Habana",
    "PBH",
    "FC Barcelona Cuba",
    "aficionados Barça Cuba",
    "peña culé La Habana",
    "socios FC Barcelona Cuba",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "es_CU",
    url: siteUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.anniversaryLabel}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.anniversaryLabel}`,
    description: siteConfig.description,
    images: ["/images/og-cover.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    foundingDate: String(siteConfig.foundedYear),
    areaServed: "CU",
    url: siteUrl,
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <html lang="es" className={`${inter.variable} ${barlow.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // JSON-LD debe inyectarse como string plano, no como nodos React.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
