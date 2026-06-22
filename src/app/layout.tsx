import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "@/lib/query/providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "GlobalNomad",
  description: "GlobalNomad",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    title: "GlobalNomad",
    description: "체험",
    siteName: "GlobalNomad",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GlobalNomad 서비스 이미지",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {children}
          <Toaster position="bottom-center" />
        </Providers>

        <Script
          src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
