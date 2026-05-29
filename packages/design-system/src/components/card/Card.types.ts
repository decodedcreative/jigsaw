import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { ClassNameOverrides, WithoutClassName } from "../../types/component-props";
import type { CardVariant, cardStyles } from "./Card.styles";

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

export type CardProps = CardPropsFor<CardElement>;
