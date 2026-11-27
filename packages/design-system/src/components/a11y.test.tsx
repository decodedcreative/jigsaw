/**
 * axe accessibility checks for every component, in its main states (JSW-122).
 *
 * Interactive components are also checked open or expanded. Content that
 * portals outside the render container (Modal, Select popover, Tooltip,
 * MobileNavigation, toasts) is checked by running axe on `document.body`.
 *
 * Rule configuration and exceptions live in `src/test-utils/axe.ts`.
 * Colour contrast is off here (jsdom has no layout) and is covered by the
 * Storybook story tests in Chromium.
 */
import { readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";

import { expectNoAxeViolations } from "../test-utils/axe";
import { componentStates as cases } from "../test-utils/component-states";
import {
  clearAllToastQueues,
  resetToastRegionMounts,
} from "./toast/toast.queue";

afterEach(() => {
  clearAllToastQueues();
  resetToastRegionMounts();
  cleanup();
});

describe("axe", () => {
  for (const [component, componentCases] of Object.entries(cases)) {
    describe(component, () => {
      it.each(componentCases)("$name has no violations", async (testCase) => {
        render(testCase.render());
        if (testCase.act) await testCase.act();
        if (testCase.assert) await waitFor(testCase.assert);
        await expectNoAxeViolations(document.body);
      });
    });
  }

  // Guard: every folder in src/components with an index.ts must have an entry
  // in `cases`, so a new component can't ship without axe checks.
  it("covers every component folder", () => {
    const componentsDir = path.join(__dirname);
    const folders = readdirSync(componentsDir, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isDirectory() &&
          existsSync(path.join(componentsDir, entry.name, "index.ts")),
      )
      .map((entry) => entry.name)
      .sort();
    expect(Object.keys(cases).sort()).toEqual(folders);
  });

  it("fails on a real violation", async () => {
    render(<button type="button" />);
    await expect(expectNoAxeViolations(document.body)).rejects.toThrow(
      /button-name/,
    );
  });
});
