import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atmanubhuti (आत्म अनुभूति) – Online Puja, Chadhava & Temple Seva",
  description:
    "India's trusted spiritual platform for online Vedic puja booking, temple offerings, consecrated prasad delivery, and personalized Sankalp video proof from Kashi Vishwanath, Mahakaleshwar, and Kamakhya.",
  keywords: [
    "Atmanubhuti",
    "atmanubhuti.in",
    "atmanubhuti.org",
    "Online puja booking",
    "Vedic pujas",
    "Kashi Vishwanath Rudrabhishek",
    "Kamakhya Devi Puja",
    "Mahakaleshwar Bhasma Aarti",
    "Chadhava online",
    "Temple prasad delivery",
    "Sanatan Dharma",
  ],
  metadataBase: new URL("https://atmanubhuti.in"),
  openGraph: {
    title: "Atmanubhuti – Authentic Vedic Rituals & Temple Seva",
    description:
      "Participate in authentic Vedic pujas with personalized Name and Gotra Sankalp. Video proof sent to your WhatsApp.",
    url: "https://atmanubhuti.in",
    siteName: "Atmanubhuti",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Hind:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-neutral-900 bg-[#FFFDF9]">
        {children}
      </body>
    </html>
  );
}
