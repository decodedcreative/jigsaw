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
/** Mounted regions per accessible name; "" is React Aria's default ("N notifications"). */
const nameCounts = new Map<string, number>();

/** @internal Returns the queue for a region id, creating one on first use. */
export function getToastQueue(region: string = DEFAULT_TOAST_REGION): ToastQueue<ToastContent> {
  let queue = queues.get(region);
  if (!queue) {
    queue = new ToastQueue<ToastContent>();
    queues.set(region, queue);
  }
  return queue;
}

function decrement(map: Map<string, number>, key: string) {
  const next = (map.get(key) ?? 1) - 1;
  if (next <= 0) map.delete(key);
  else map.set(key, next);
}

/**
 * @internal Tracks a mounted {@link ToastRegion} for the given region id and
 * accessible name. Warns in development when duplicate region ids are mounted,
 * or when two mounted regions share a name, since screen reader users then
 * can't tell the landmarks apart.
 */
export function registerToastRegion(region: string = DEFAULT_TOAST_REGION, name: string = "") {
  if (process.env.NODE_ENV !== "production") {
    if ((mountCounts.get(region) ?? 0) > 0) {
      console.warn(
        `[@jigsaw-ds/design-system] Multiple <ToastRegion region="${region}" /> instances are mounted. ` +
          "Each toast posted to this region will render once per instance."
      );
    } else if ((nameCounts.get(name) ?? 0) > 0) {
      const described = name ? `aria-label="${name}"` : "no aria-label";
      console.warn(
        `[@jigsaw-ds/design-system] Two <ToastRegion>s are mounted with ${described}, so screen readers ` +
          `announce both landmarks with the same name. Give each region its own aria-label, ` +
          `e.g. <ToastRegion region="${region}" aria-label="Alerts" />.`
      );
    }
  }

  mountCounts.set(region, (mountCounts.get(region) ?? 0) + 1);
  nameCounts.set(name, (nameCounts.get(name) ?? 0) + 1);

  return () => {
    decrement(mountCounts, region);
    decrement(nameCounts, name);
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
  nameCounts.clear();
}
