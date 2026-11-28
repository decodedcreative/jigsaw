/// <reference types="vite/client" />
/**
 * `data-scope` and `data-part` on every component part (JSW-132).
 *
 * Renders every state in `componentStates` and checks that:
 * - each `data-scope` names a styles export, as `getPartProps` documents
 *   (`navigationLinkStyles` is `"navigation-link"`), and each `data-part` is
 *   one of that styles object's keys;
 * - every key of a folder's styles objects appears in at least one of the
 *   folder's states, so a part that's missing its props, or only renders in a
 *   state with no entry, fails here.
 */
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";

import { componentStates } from "../test-utils/component-states";
import {
  clearAllToastQueues,
  resetToastRegionMounts,
} from "./toast/toast.queue";

afterEach(() => {
  clearAllToastQueues();
  resetToastRegionMounts();
  cleanup();
});

type StylesEntry = { scope: string; folder: string; parts: string[] };

/** `navigationLinkStyles` → `navigation-link`. */
function scopeFor(exportName: string) {
  return exportName
    .replace(/Styles$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

const styleModules = import.meta.glob<Record<string, unknown>>(
  "./**/*.styles.ts",
  { eager: true },
);

const stylesByScope = new Map<string, StylesEntry>();
for (const [file, module] of Object.entries(styleModules)) {
  if (file.endsWith(".stories.styles.ts")) continue;
  const folder = file.split("/")[1];
  for (const [name, styles] of Object.entries(module)) {
    if (
      !name.endsWith("Styles") ||
      typeof styles !== "object" ||
      styles === null
    )
      continue;
    stylesByScope.set(scopeFor(name), {
      scope: scopeFor(name),
      folder,
      parts: Object.keys(styles),
    });
  }
}

/**
 * Folders not yet converted to `getPartProps`. Emptied as each component is
 * converted; the PR removes it.
 */
const NOT_YET_CONVERTED = new Set(
  Object.keys(componentStates).filter(
    (folder) =>
      ![
        "avatar",
        "badge",
        "button",
        "card",
        "heading",
        "icon",
        "skeleton",
        "text",
      ].includes(folder),
  ),
);

describe("data-scope and data-part", () => {
  it("finds the styles exports", () => {
    expect(stylesByScope.get("button")?.parts).toEqual(
      expect.arrayContaining(["component", "text", "media"]),
    );
    expect(stylesByScope.get("navigation-link")).toBeDefined();
  });

  for (const [folder, states] of Object.entries(componentStates)) {
    it(`${folder}: every part is marked, with a scope and part from its styles`, async () => {
      const seen = new Map<string, Set<string>>();

      for (const state of states) {
        render(state.render());
        if (state.act) await state.act();
        if (state.assert) await waitFor(state.assert);

        for (const element of Array.from(
          document.body.querySelectorAll("[data-scope]"),
        )) {
          const scope = element.getAttribute("data-scope") ?? "";
          const part = element.getAttribute("data-part") ?? "";
          const entry = stylesByScope.get(scope);
          expect(
            entry,
            `data-scope="${scope}" doesn't name a styles export (${state.name})`,
          ).toBeDefined();
          expect(
            entry?.parts,
            `data-part="${part}" isn't a part of ${scope}Styles (${state.name})`,
          ).toContain(part);
          if (!seen.has(scope)) seen.set(scope, new Set());
          seen.get(scope)?.add(part);
        }

        clearAllToastQueues();
        resetToastRegionMounts();
        cleanup();
      }

      if (NOT_YET_CONVERTED.has(folder)) return;
      for (const entry of stylesByScope.values()) {
        if (entry.folder !== folder) continue;
        const missing = entry.parts.filter(
          (part) => !seen.get(entry.scope)?.has(part),
        );
        expect(
          missing,
          `${entry.scope} parts with no data-part in any ${folder} state`,
        ).toEqual([]);
      }
    });
  }
});
