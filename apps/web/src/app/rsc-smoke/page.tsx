import { Badge } from "@jigsaw-ds/design-system/badge";
import { Button } from "@jigsaw-ds/design-system/button";
import { Card } from "@jigsaw-ds/design-system/card";
import { Heading } from "@jigsaw-ds/design-system/heading";
import { Text } from "@jigsaw-ds/design-system/text";

/**
 * RSC smoke page (JSW-113): package subpath imports from a Server Component.
 *
 * - Presentational modules (`badge`, `card`, `heading`, `text`) stay on the
 *   server graph (no `"use client"` on this file).
 * - Interactive `button` is imported from its own subpath so Next creates a
 *   client boundary at that leaf — proving mixed RSC + client usage works
 *   without going through the root barrel.
 *
 * `next build` (via `validate:packages`) must prerender this route without a
 * mixed-barrel / client-only error.
 */
export default function RscSmokePage() {
  return (
    <main className="p-8 max-w-lg mx-auto flex flex-col gap-4">
      <Card>
        <Heading as="h1">RSC smoke</Heading>
        <Text as="p" muted>
          Presentational Jigsaw imports from package subpaths in a Server
          Component, plus an interactive client leaf from its own subpath.
        </Text>
        <div className="mt-4 flex items-center gap-3">
          <Badge variant="success">Live</Badge>
          <Button size="sm">Client leaf</Button>
        </div>
      </Card>
    </main>
  );
}
