import {
  DEFAULT_TOAST_REGION,
  getToastQueue,
  isToastRegionMounted,
} from "./toast.queue";
import type { ToastCallOptions, ToastContent, ToastOptions } from "./Toast.types";

function resolveToastCall(
  contentOrOptions: ToastContent | ToastOptions,
  callOptions?: ToastCallOptions
): { content: ToastContent; duration?: number; region: string } {
  if (callOptions !== undefined) {
    return {
      content: contentOrOptions as ToastContent,
      duration: callOptions.duration,
      region: callOptions.region ?? DEFAULT_TOAST_REGION,
    };
  }

  const { duration, region, ...content } = contentOrOptions as ToastOptions;
  return { content, duration, region: region ?? DEFAULT_TOAST_REGION };
}

function warnIfRegionNotMounted(region: string) {
  if (process.env.NODE_ENV === "production") return;

  if (!isToastRegionMounted()) {
    console.warn(
      "[@jigsaw/design-system] toast() called with no <ToastRegion /> mounted. " +
        "Add <ToastRegion /> to your app layout."
    );
    return;
  }

  if (!isToastRegionMounted(region)) {
    console.warn(
      `[@jigsaw/design-system] toast() posted to region "${region}" but no ` +
        `<ToastRegion region="${region}" /> is mounted. The toast will not be visible.`
    );
  }
}

function showToast(
  contentOrOptions: ToastContent | ToastOptions,
  callOptions?: ToastCallOptions
): string {
  const { content, duration, region } = resolveToastCall(contentOrOptions, callOptions);
  warnIfRegionNotMounted(region);

  const queue = getToastQueue(region);
  return queue.add(content, duration === 0 ? undefined : { timeout: duration ?? 5000 });
}

/** Queue a toast notification. Returns a key for {@link toast.close}. */
export function toast(
  contentOrOptions: ToastContent | ToastOptions,
  callOptions?: ToastCallOptions
): string {
  return showToast(contentOrOptions, callOptions);
}

/** Dismiss a toast by the key returned from {@link toast}. */
toast.close = (key: string, region: string = DEFAULT_TOAST_REGION) => {
  getToastQueue(region).close(key);
};
