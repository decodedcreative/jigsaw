import { Icon } from "@jigsaw/design-system";
import { SquaresFourIcon } from "@phosphor-icons/react";

export const BrandMark = () => (
  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-interactive-accent mb-4">
    <Icon
      icon={SquaresFourIcon}
      size="lg"
      classNameOverrides={{ component: "text-white" }}
    />
  </div>
);
