import '@testing-library/jest-dom/vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, 'ResizeObserver', { writable: true, value: MockResizeObserver });

/**
 * Fail any test that logs a warning or error it didn't expect (JSW-128).
 *
 * A test that expects one should mock it, e.g.
 * `vi.spyOn(console, "warn").mockImplementation(() => {})`, and assert on the
 * spy. A mocked console method never reaches the wrapper below, so it isn't
 * counted.
 */
import { afterEach, beforeEach } from "vitest";
import { format } from "node:util";

const originalConsole = { warn: console.warn, error: console.error };
const unexpectedConsole: string[] = [];

beforeEach(() => {
  unexpectedConsole.length = 0;
  for (const method of ["warn", "error"] as const) {
    console[method] = (...args: unknown[]) => {
      unexpectedConsole.push(`console.${method}: ${format(...args)}`);
      originalConsole[method](...args);
    };
  }
});

// Setup-file hooks run after the test file's own afterEach hooks, so a test's
// vi.restoreAllMocks() has already put this wrapper back before we check.
afterEach(() => {
  const messages = unexpectedConsole.splice(0);
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
  if (messages.length > 0) {
    throw new Error(
      `Unexpected console output during this test. Fix the cause, or mock the console ` +
        `method in the test if the message is expected:\n${messages.map((m) => `  ${m}`).join("\n")}`
    );
  }
});
