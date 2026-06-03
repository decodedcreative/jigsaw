import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";
import type { cardStyles } from "./Card.styles";

export type CardVariant = NonNullable<VariantProps<typeof cardStyles.component>["variant"]>;

export type CardElement = "div" | "a" | "button";

type CardBaseProps = {
  variant?: CardVariant;
  title?: string;
  description?: string;
  actions?: ReactNode;
  header?: ReactNode;
  image?: ReactNode;
  footer?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof cardStyles>;
};

type CardPropsFor<T extends CardElement> = CardBaseProps &
  (T extends "div" ? { as?: "div" } : { as: T }) &
  WithoutClassName<ComponentPropsWithoutRef<T>>;

export type CardProps =
  | CardPropsFor<"div">
  | CardPropsFor<"a">
  | CardPropsFor<"button">;
