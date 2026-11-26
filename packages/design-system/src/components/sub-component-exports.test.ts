/**
 * Every part attached with dot notation, such as `Card.Header`, is also
 * exported by name, such as `CardHeader`. A React Server Component can't
 * reach a part through dot notation on a client component's import, so the
 * named export is the only way to use it there.
 */
import { describe, expect, it } from "vitest";
import * as jigsaw from "../index";

type Part = { name: string; component: unknown; exportName: string };

/** `DS_Card.Header` → `CardHeader`. */
function exportNameFor(displayName: string) {
  return displayName.replace(/^DS_/, "").replace(".", "");
}

function attachedParts(): Part[] {
  const parts: Part[] = [];
  for (const [name, value] of Object.entries(jigsaw)) {
    if (typeof value !== "function") continue;
    for (const [key, part] of Object.entries(value)) {
      const displayName = (part as { displayName?: unknown } | null)
        ?.displayName;
      if (typeof part !== "function" || typeof displayName !== "string")
        continue;
      if (!displayName.startsWith("DS_") || !displayName.includes("."))
        continue;
      parts.push({
        name: `${name}.${key}`,
        component: part,
        exportName: exportNameFor(displayName),
      });
    }
  }
  return parts;
}

describe("sub-component exports", () => {
  const parts = attachedParts();

  it("finds the attached parts", () => {
    // Guards against the search silently finding nothing.
    expect(parts.map((part) => part.name)).toEqual(
      expect.arrayContaining([
        "Card.Header",
        "Form.Group",
        "RadioGroup.Item",
        "Select.Item",
      ]),
    );
  });

  it.each(parts)(
    "exports $name by name, as $exportName",
    ({ component, exportName }) => {
      expect((jigsaw as Record<string, unknown>)[exportName]).toBe(component);
    },
  );
});
