import { useEffect, useState } from "react";

import {
  formatCssRgbTupleForDisplay,
  readCssVariableColor,
} from "@jigsaw-ds/tokens/css-color";

const THEME_ATTRIBUTE_FILTER = ["class", "style", "data-theme"];

export function readCssColor(cssVar: string): string {
  if (typeof document === "undefined") return "";
  return readCssVariableColor(cssVar, (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name),
  );
}

export { formatCssRgbTupleForDisplay };

let observer: MutationObserver | null = null;
const listeners = new Set<() => void>();
let rafId: number | null = null;

function scheduleNotify() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    for (const listener of listeners) listener();
  });
}

function ensureThemeObserver() {
  if (observer || typeof document === "undefined") return;

  observer = new MutationObserver(scheduleNotify);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: THEME_ATTRIBUTE_FILTER,
  });
}

export function subscribeThemeAttributeChanges(listener: () => void): () => void {
  if (typeof document === "undefined") return () => {};

  listeners.add(listener);
  ensureThemeObserver();

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      observer?.disconnect();
      observer = null;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
  };
}

export function useResolvedCssColor(cssVar: string): string {
  const isValidVar = typeof cssVar === "string" && cssVar.startsWith("--");
  const [resolved, setResolved] = useState("");

  useEffect(() => {
    if (!isValidVar || typeof document === "undefined") return;

    const update = () => setResolved(readCssColor(cssVar));
    update();
    return subscribeThemeAttributeChanges(update);
  }, [cssVar, isValidVar]);

  if (!isValidVar) return "invalid css var";
  return resolved || cssVar;
}
