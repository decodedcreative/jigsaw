import axe, { type ImpactValue, type Result, type RunOptions } from "axe-core";

/**
 * Shared axe-core configuration for the design-system unit tests (JSW-122).
 *
 * Keep every rule exception here, with its reason, so it is visible in one
 * place. Anything switched off here must be covered somewhere else.
 */
export const AXE_OPTIONS: RunOptions = {
  rules: {
    // jsdom has no layout or computed colour, so contrast can't be measured
    // here. It is covered by the Storybook story tests in Chromium (JSW-124),
    // which run axe with color-contrast on.
    "color-contrast": { enabled: false },
    // Components are rendered in isolation, outside any page landmarks or
    // heading outline. Landmarks and the page `h1` belong to the app.
    region: { enabled: false },
    "landmark-one-main": { enabled: false },
    "page-has-heading-one": { enabled: false },
  },
};

function formatViolation(violation: Result): string {
  const nodes = violation.nodes
    .map((node) => `    ${node.target.join(" ")}\n      ${node.failureSummary?.replace(/\n/g, "\n      ")}`)
    .join("\n");
  return `  [${violation.impact as ImpactValue}] ${violation.id}: ${violation.help}\n    ${violation.helpUrl}\n${nodes}`;
}

/**
 * Run axe on `context` and fail the test with a readable list of violations.
 *
 * Pass `document.body` (the default) for components that portal content
 * outside the render container, such as an open Modal, Select or Tooltip.
 */
export async function expectNoAxeViolations(
  context: Element | Document = document.body,
  options: RunOptions = {}
): Promise<void> {
  const results = await axe.run(context, {
    ...AXE_OPTIONS,
    ...options,
    rules: { ...AXE_OPTIONS.rules, ...options.rules },
  });
  if (results.violations.length > 0) {
    throw new Error(
      `Expected no axe violations, found ${results.violations.length}:\n${results.violations
        .map(formatViolation)
        .join("\n")}`
    );
  }
}
