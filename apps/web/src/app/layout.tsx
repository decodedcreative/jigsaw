import type { Metadata } from "next";
import "@jigsaw/tokens/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jigsaw",
  description: "Example Next.js app that dogfoods the Jigsaw design system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans text-text-primary bg-background-base">
        {children}
      </body>
    </html>
  );
}
