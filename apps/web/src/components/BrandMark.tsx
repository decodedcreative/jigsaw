import { Icon } from "@jigsaw/design-system";
import { SquaresFourIcon } from "@phosphor-icons/react";

export function BrandMark() {
  return (
    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-interactive-accent">
      <Icon icon={SquaresFourIcon} size="lg" tone="on-accent" />
    </div>
  );
}
