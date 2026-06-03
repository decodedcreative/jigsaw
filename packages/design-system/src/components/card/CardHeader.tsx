"use client";

import type { ReactNode } from "react";
import { useGetClassNames } from "@hooks";
import { H3 } from "../heading/Heading.aliases";
import { cardStyles } from "./Card.styles";
import type { ClassNameOverrides } from "@jsw-types/component-props";

type CardHeaderProps = {
  classNameOverrides?: ClassNameOverrides<typeof cardStyles>;
  title?: string;
  description?: string;
  actions?: ReactNode;
  header?: ReactNode;
};

const CardHeader = ({
  classNameOverrides,
  title,
  description,
  actions,
  header,
}: CardHeaderProps) => {
  const classNames = useGetClassNames(cardStyles, classNameOverrides, {
    header: { hasActions: header == null && Boolean(actions) },
  });

  if (header != null) {
    return <div className={classNames.header}>{header}</div>;
  }

  if (!title && !description && !actions) {
    return null;
  }

  return (
    <div className={classNames.header}>
      <div className={classNames.headerContent}>
        {title ? (
          // h3 semantics with h4 visual scale — card titles sit below page/section headings.
          <H3 size="h4">{title}</H3>
        ) : null}
        {description ? <p className={classNames.description}>{description}</p> : null}
      </div>
      {actions}
    </div>
  );
};

CardHeader.displayName = "Card.Header";

export { CardHeader };
