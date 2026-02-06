import type { Metadata } from "next";
import { Parisienne, Cormorant_Garamond, Space_Grotesk, Inter, Black_Ops_One } from "next/font/google";
import "./globals.css";

const parisienne = Parisienne({
  weight: "400",
  variable: "--font-parisienne",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const blackOps = Black_Ops_One({
  weight: "400",
  variable: "--font-black-ops",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creator Conservatory",
  description: "Stop being the world's best-kept secret. Learn to create content that amplifies your art. Join the community for artists who want to grow online without sacrificing their credibility.",
  openGraph: {
    title: "Creator Conservatory",
    description: "Stop being the world's best-kept secret. Learn to create content that amplifies your art. Join the community for artists who want to grow online without sacrificing their credibility.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Conservatory",
    description: "Stop being the world's best-kept secret. Learn to create content that amplifies your art. Join the community for artists who want to grow online without sacrificing their credibility.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${parisienne.variable} ${cormorant.variable} ${spaceGrotesk.variable} ${inter.variable} ${blackOps.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
