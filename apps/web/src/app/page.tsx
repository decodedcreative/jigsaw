"use client";

import { Button } from "@jigsaw/design-system";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Jigsaw</h1>
      <p className="text-text-secondary">Design system dogfood app — more screens coming soon.</p>
      <Button variant="primary">Get in touch</Button>
    </main>
  );
}
