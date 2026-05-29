"use client";

import {
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";
import { useGetClassNames } from "@hooks";
import { isClickable } from "@utils";
import { cardStyles } from "./Card.styles";
import type { CardProps } from "./Card.types";
import { CardHeader } from "./CardHeader";

export const Card = (props: CardProps) => {
  const {
    as: element = "div",
    variant = "default",
    title,
    description,
    actions,
    header,
    image,
    footer,
    classNameOverrides,
    children,
    ...elementProps
  } = props;

  const interactive = isClickable({
    as: element,
    onClick: props.onClick,
    href: "href" in elementProps ? elementProps.href : undefined,
  });

  if (process.env.NODE_ENV !== "production" && interactive && element === "div") {
    console.warn(
      'Card: a clickable card rendered as a "div" is not keyboard accessible. ' +
        'Use `as="a"` for navigation or `as="button"` for actions so the card ' +
        "gets focus and keyboard activation for free."
    );
  }

  const classNames = useGetClassNames(cardStyles, classNameOverrides, {
    component: {
      variant,
      interactiveState: variant === "interactive" && interactive,
    },
  });

  // Polymorphic boundary: the public API is type-safe via CardProps, but TS
  // can't correlate the div/a/button prop union at a single spread site, so we
  // assert once here. Removing either assertion fails typecheck (see JSW-11).
  const Component = element as ElementType;

  return (
    <Component
      className={classNames.component}
      {...(element === "button" ? { type: "button" } : undefined)}
      {...(elementProps as ComponentPropsWithoutRef<typeof element>)}
    >
      {image != null ? <div className={classNames.image}>{image}</div> : null}
      <Card.Header
        classNameOverrides={classNameOverrides}
        title={title}
        description={description}
        actions={actions}
        header={header}
      />
      {children != null ? <div className={classNames.content}>{children}</div> : null}
      {footer != null ? <div className={classNames.footer}>{footer}</div> : null}
    </Component>
  );
};

Card.displayName = "DS_Card";
Card.Header = CardHeader;

export type CardComponent = typeof Card & {
  Header: typeof CardHeader;
};

export default Card;
