import type { ToastVariant } from "@jigsaw-ds/design-system";

export type ToastExample = {
  label: string;
  variant: ToastVariant;
  title: string;
  description?: string;
};

export type Notification = {
  id: string;
  type: "mention" | "invite" | "update" | "alert";
  title: string;
  body: string;
  time: string;
  read: boolean;
};
