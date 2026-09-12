import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: `${siteConfig.companyName} | ${siteConfig.slogan}`,
  description: siteConfig.subSlogan,
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    title: `${siteConfig.companyName} | ${siteConfig.slogan}`,
    description: siteConfig.subSlogan,
    locale: "ko_KR",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.companyName} | ${siteConfig.slogan}`,
    description: siteConfig.subSlogan,
    images: ["/og.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#161616",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: siteConfig.companyName,
  description: siteConfig.subSlogan,
  telephone: siteConfig.phoneHref.replace("tel:", "+82-").replace(/^\+82-0/, "+82-"),
  email: siteConfig.email,
  url: `${siteConfig.siteUrl}/`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "인주대로 5",
    addressLocality: "미추홀구",
    addressRegion: "인천광역시",
    addressCountry: "KR",
  },
  areaServed: "인천광역시",
  founder: {
    "@type": "Person",
    name: siteConfig.ceo,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SmoothScroll />
        <CustomCursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
