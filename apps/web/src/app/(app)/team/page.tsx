"use client";

import { ToastProvider } from "@jigsaw/design-system";
import { TeamDirectory } from "./sub-components/TeamDirectory";

export default function TeamPage() {
  return (
    <ToastProvider position="bottom-right">
      <TeamDirectory />
    </ToastProvider>
  );
}
