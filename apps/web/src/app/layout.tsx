import type { Metadata } from "next";
// Theme CSS load order: shared primitives → default (light/dark at :root) → portfolio
// ([data-theme='portfolio']). All sheets are bundled up front; runtime switching only
// changes which selector matches — no rebuild required.
import "@jigsaw-ds/tokens/shared/base.css";
import "@jigsaw-ds/theme-default/base.css";
import "@jigsaw-ds/theme-default/semantic-light.css";
import "@jigsaw-ds/theme-default/semantic-dark.css";
import "@jigsaw-ds/theme-portfolio/base.css";
import "@jigsaw-ds/theme-portfolio/semantic.css";
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
