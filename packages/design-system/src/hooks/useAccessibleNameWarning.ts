"use client";

import { useCallback, useRef, type Ref, type RefCallback } from "react";

/** Elements already checked, so re-renders and re-attached refs don't repeat the check. */
const checked = new WeakSet<Element>();

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
}

export type AccessibleNameWarningOptions = {
  /**
   * CSS selector for the element that must be named, when it isn't the root,
   * e.g. the `<input>` inside a text field. Defaults to the root itself.
   */
  target?: string;
  /**
   * Overrides the DOM check, for controls whose computed name can come from
   * something that isn't a real label. Select's trigger is "named" by its
   * placeholder or value text, which doesn't say what the field is for.
   */
  isNamed?: () => boolean;
};

/**
 * Warns in development when a control renders without an accessible name
 * (JSW-128), so every Jigsaw control warns the same way. React Aria only
 * warns for some components.
 *
 * Returns a callback ref for the component's root element that also forwards
 * to the consumer's `ref`. When the ref attaches to an element in the document,
 * it computes the real accessible name (aria-label, aria-labelledby, `<label>`,
 * text content, image alt text, …) with `dom-accessibility-api`, the library
 * Testing Library uses. That module is only loaded in development; production
 * builds skip the check entirely.
 *
 * The check runs once per element, shortly after it mounts (once the lazy
 * import resolves), against the DOM at that moment. A name that arrives later
 * (e.g. a label loaded asynchronously) can still produce one warning, and a
 * name removed later won't warn again. That's a deliberate trade-off for a
 * cheap development hint; the axe and announcement tests check named states
 * properly.
 *
 * The check runs on ref attach rather than in an effect because React Aria
 * collection items (Tab, Select.Item, …) first render into a hidden document;
 * the ref only points at the real element later.
 */
export function useAccessibleNameWarning<T extends Element>(
  componentName: string,
  ref: Ref<T> | undefined,
  options: AccessibleNameWarningOptions = {}
): RefCallback<T> {
  const latest = useRef({ componentName, options });
  latest.current = { componentName, options };

  return useCallback(
    (node: T | null) => {
      assignRef(ref, node);
      if (process.env.NODE_ENV === "production" || !node || checked.has(node)) return;

      void import("dom-accessibility-api").then(({ computeAccessibleName }) => {
        // Hidden collection renders and unmounted elements aren't in the document.
        if (!node.isConnected || checked.has(node)) return;
        checked.add(node);
        const { componentName: name, options: opts } = latest.current;
        const element = (opts.target ? node.querySelector(opts.target) : null) ?? node;
        const named = opts.isNamed ? opts.isNamed() : computeAccessibleName(element).trim() !== "";
        if (named) return;
        console.warn(
          `[@jigsaw-ds/design-system] <${name}> has no accessible name, so screen readers ` +
            "announce it without one. Give it visible text, a `label`, or an `aria-label` / " +
            "`aria-labelledby`."
        );
      });
    },
    [ref]
  );
}
