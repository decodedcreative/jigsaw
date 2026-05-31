import { Icon } from "@jigsaw/design-system";
import { CheckIcon } from "@phosphor-icons/react";

export const SuccessCheck = () => (
  <div className="w-12 h-12 rounded-full bg-state-success-bg flex items-center justify-center mx-auto mb-4">
    <Icon icon={CheckIcon} size="lg" tone="success" />
  </div>
);
