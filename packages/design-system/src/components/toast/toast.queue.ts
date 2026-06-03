/**
 * Toast queue backed by React Aria's toast primitives.
 *
 * RAC exports are currently prefixed `UNSTABLE_*` (react-aria-components/Toast).
 * When Adobe stabilises the API, update imports in this module only — aliases
 * are re-exported internally as `ToastQueue`, etc.
 */
import { UNSTABLE_ToastQueue as ToastQueue } from "react-aria-components/Toast";
import type { ToastContent } from "./Toast.types";

/** Default {@link ToastRegion} / {@link toast} queue id. */
export const DEFAULT_TOAST_REGION = "default";

/** Queues persist for the app lifetime; use fixed {@link ToastRegionId} values only. */
const queues = new Map<string, ToastQueue<ToastContent>>();
const mountCounts = new Map<string, number>();

/** @internal Returns the queue for a region id, creating one on first use. */
export function getToastQueue(region: string = DEFAULT_TOAST_REGION): ToastQueue<ToastContent> {
  let queue = queues.get(region);
  if (!queue) {
    queue = new ToastQueue<ToastContent>();
    queues.set(region, queue);
  }
  return queue;
}

/**
 * @internal Tracks a mounted {@link ToastRegion} for the given region id.
 * Warns in development when duplicate region ids are mounted.
 */
export function registerToastRegion(region: string = DEFAULT_TOAST_REGION) {
  if (process.env.NODE_ENV !== "production") {
    const count = mountCounts.get(region) ?? 0;
    if (count > 0) {
      console.warn(
        `[@jigsaw/design-system] Multiple <ToastRegion region="${region}" /> instances are mounted. ` +
          "Each toast posted to this region will render once per instance."
      );
    }
  }

  mountCounts.set(region, (mountCounts.get(region) ?? 0) + 1);

  return () => {
    const next = (mountCounts.get(region) ?? 1) - 1;
    if (next <= 0) {
      mountCounts.delete(region);
    } else {
      mountCounts.set(region, next);
    }
  };
}

/** @internal Returns whether a region id (or any region) currently has a mounted viewport. */
export function isToastRegionMounted(region?: string): boolean {
  if (region !== undefined) {
    return (mountCounts.get(region) ?? 0) > 0;
  }
  return mountCounts.size > 0;
}

/** @internal Clears every queue — for tests. */
export function clearAllToastQueues() {
  for (const queue of queues.values()) {
    queue.clear();
  }
}

/** @internal Resets mount tracking — for tests. */
export function resetToastRegionMounts() {
  mountCounts.clear();
}
