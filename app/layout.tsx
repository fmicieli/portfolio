import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = "https://florenciamicieli.com.ar";
const title = "Florencia Micieli — UX/UI Designer · Product Design";
const description =
  "3+ años diseñando productos B2B y SaaS. Sistemas de diseño, prototipos de alta fidelidad y un flujo potenciado por IA generativa para explorar, documentar y construir interfaces de forma autónoma.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Florencia Micieli",
    locale: "es_AR",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-bg text-fg`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
