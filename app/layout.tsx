import type { Metadata } from "next";
import localFont from "next/font/local";
import { NotificationProvider } from "@/mobx/notificationPtoviderClient";
import "./globals.css";
import { getCurrentCompetidor } from "@/lib/auth/current-user";
import { UserStoreInitializer } from "@/components/UserStoreInitializer/UserStoreInitializer";
import {
  absoluteUrl,
  siteDescription,
  siteKeywords,
  siteName,
  siteUrl,
} from "@/lib/seo";
const kuunari = localFont({
  src: [
    {
      path: "../assests/Kuunari/fonts/aqui.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assests/Kuunari/fonts/aqui2.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-kuunari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: `${siteName} | Notícias gamer e campeonatos`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "games",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName,
    title: `${siteName} | Notícias gamer e campeonatos`,
    description: siteDescription,
    images: [
      {
        url: absoluteUrl("/bgBanner.png"),
        width: 1200,
        height: 630,
        alt: `${siteName} - portal gamer, notícias e campeonatos`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Notícias gamer e campeonatos`,
    description: siteDescription,
    images: [absoluteUrl("/bgBanner.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const competidor = await getCurrentCompetidor();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/logo.png"),
    description: siteDescription,
    sameAs: [],
  };
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: absoluteUrl("/logo.png"),
    },
  };

  return (
    <html lang="pt-BR" className={`${kuunari.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([structuredData, websiteStructuredData]),
          }}
        />
        <UserStoreInitializer user={competidor} />

        {children}
        <NotificationProvider />
      </body>
    </html>
  );
}
