import { cva } from "class-variance-authority";

export const modalStyles = {
  overlay: cva([
    "fixed inset-0 z-50 bg-black/50 backdrop-blur-xs",
    "entering:animate-in entering:fade-in",
    "exiting:animate-out exiting:fade-out",
  ]),
  component: cva([
    "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
    "flex flex-col w-full max-w-lg max-h-[min(32rem,calc(100vh-2rem))] overflow-hidden",
    "bg-surface-default rounded-lg shadow-xl border border-border-default",
    "entering:animate-in entering:fade-in entering:zoom-in-95 entering:slide-in-from-left-1/2 entering:slide-in-from-top-[48%]",
    "exiting:animate-out exiting:fade-out exiting:zoom-out-95 exiting:slide-out-to-left-1/2 exiting:slide-out-to-top-[48%]",
    "focus:outline-hidden",
  ]),
  dialog: cva([
    "grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden outline-hidden",
  ]),
  header: cva(["shrink-0 flex items-center justify-between p-6 border-b border-border-default"]),
  title: cva(["text-lg font-semibold text-foreground-primary"]),
  closeButton: cva([
    "p-1.5 rounded-md text-foreground-muted hover:text-foreground-primary hover:bg-surface-muted transition-colors",
    "focus:outline-hidden focus-visible:ring-2 focus-visible:ring-interactive-accent",
  ]),
  content: cva(["min-h-0 overflow-y-auto overscroll-contain p-6"]),
  footer: cva(["shrink-0 flex items-center justify-end gap-3 p-6 border-t border-border-default"]),
};
