import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "@jigsaw/tokens/shared/base.css";
import "@jigsaw/tokens/themes/default/base.css";
import "@jigsaw/tokens/themes/default/semantic-light.css";
import "@jigsaw/tokens/themes/default/semantic-dark.css";
import "@jigsaw/tokens/themes/portfolio/base.css";
import "@jigsaw/tokens/themes/portfolio/semantic.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jigsaw",
  description: "Example Next.js app that dogfoods the Jigsaw design system.",
  icons: { icon: "/logo.webp" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased font-sans text-foreground-primary bg-surface-primary">
        {children}
      </body>
    </html>
  );
}
