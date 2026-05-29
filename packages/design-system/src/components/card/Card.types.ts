import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { CardVariant, cardStyles } from "./Card.styles";

export type CardElement = "div" | "a" | "button";

export type CardClassNameOverrides = Partial<Record<keyof typeof cardStyles, string[]>>;

type CardBaseProps = {
  variant?: CardVariant;
  title?: string;
  description?: string;
  actions?: ReactNode;
  header?: ReactNode;
  image?: ReactNode;
  footer?: ReactNode;
  classNameOverrides?: CardClassNameOverrides;
};

type CardPropsFor<T extends CardElement> = CardBaseProps &
  (T extends "div" ? { as?: "div" } : { as: T }) &
  ComponentPropsWithoutRef<T>;

export type CardProps = CardPropsFor<CardElement>;
