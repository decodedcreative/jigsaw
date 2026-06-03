import type { VariantProps } from "class-variance-authority";
import type { badgeStyles } from "./Badge.styles";

export type BadgeVariant = NonNullable<VariantProps<typeof badgeStyles.component>["variant"]>;
export type BadgeSize = NonNullable<VariantProps<typeof badgeStyles.component>["size"]>;
