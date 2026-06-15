import type { Metadata } from "next";
import "@jigsaw/tokens/shared/base.css";
import "@jigsaw/theme-default/base.css";
import "@jigsaw/theme-default/semantic-light.css";
import "@jigsaw/theme-default/semantic-dark.css";
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
      <body className="antialiased font-sans text-foreground-primary bg-surface-primary">
        {children}
      </body>
    </html>
  );
}
