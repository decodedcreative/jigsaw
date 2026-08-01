import { Badge } from "@jigsaw-ds/design-system/badge";
import { Card } from "@jigsaw-ds/design-system/card";
import { Heading } from "@jigsaw-ds/design-system/heading";
import { Text } from "@jigsaw-ds/design-system/text";

/**
 * RSC smoke page (JSW-113): presentational components imported via package
 * subpaths, with no `"use client"` on this module. `next build` must succeed
 * without a mixed-barrel / client-only error.
 */
export default function RscSmokePage() {
  return (
    <main className="p-8 max-w-lg mx-auto">
      <Card>
        <Heading as="h1">RSC smoke</Heading>
        <Text as="p" muted>
          Presentational Jigsaw imports from package subpaths in a Server
          Component.
        </Text>
        <Badge variant="success">Live</Badge>
      </Card>
    </main>
  );
}
