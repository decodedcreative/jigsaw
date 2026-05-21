"use client";

import { type HTMLAttributes } from "react";
import { useGetClassNames } from "@hooks";
import { cardStyles, type CardVariant, type CardPadding } from "./Card.styles";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  padding?: CardPadding;
  classNameOverrides?: Record<string, string[]>;
};

export const Card = ({
  variant = "default",
  padding = "none",
  classNameOverrides,
  children,
  ...props
}: CardProps) => {
  const classNames = useGetClassNames(cardStyles, classNameOverrides, {
    root: { variant, padding },
  });

  return (
    <div className={classNames.root} {...props}>
      {children}
    </div>
  );
};

Card.displayName = "DS_Card";

export type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  classNameOverrides?: Record<string, string[]>;
};

export const CardHeader = ({ classNameOverrides, children, ...props }: CardHeaderProps) => {
  const classNames = useGetClassNames(cardStyles, classNameOverrides, { header: {} });
  return (
    <div className={classNames.header} {...props}>
      {children}
    </div>
  );
};

CardHeader.displayName = "DS_CardHeader";

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  classNameOverrides?: Record<string, string[]>;
};

export const CardTitle = ({ classNameOverrides, children, ...props }: CardTitleProps) => {
  const classNames = useGetClassNames(cardStyles, classNameOverrides, { title: {} });
  return (
    <h3 className={classNames.title} {...props}>
      {children}
    </h3>
  );
};

CardTitle.displayName = "DS_CardTitle";

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  classNameOverrides?: Record<string, string[]>;
};

export const CardDescription = ({
  classNameOverrides,
  children,
  ...props
}: CardDescriptionProps) => {
  const classNames = useGetClassNames(cardStyles, classNameOverrides, { description: {} });
  return (
    <p className={classNames.description} {...props}>
      {children}
    </p>
  );
};

CardDescription.displayName = "DS_CardDescription";

export type CardContentProps = HTMLAttributes<HTMLDivElement> & {
  classNameOverrides?: Record<string, string[]>;
};

export const CardContent = ({ classNameOverrides, children, ...props }: CardContentProps) => {
  const classNames = useGetClassNames(cardStyles, classNameOverrides, { content: {} });
  return (
    <div className={classNames.content} {...props}>
      {children}
    </div>
  );
};

CardContent.displayName = "DS_CardContent";

export type CardFooterProps = HTMLAttributes<HTMLDivElement> & {
  classNameOverrides?: Record<string, string[]>;
};

export const CardFooter = ({ classNameOverrides, children, ...props }: CardFooterProps) => {
  const classNames = useGetClassNames(cardStyles, classNameOverrides, { footer: {} });
  return (
    <div className={classNames.footer} {...props}>
      {children}
    </div>
  );
};

CardFooter.displayName = "DS_CardFooter";

export type CardImageProps = HTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  classNameOverrides?: Record<string, string[]>;
};

export const CardImage = ({ src, alt, classNameOverrides, ...props }: CardImageProps) => {
  const classNames = useGetClassNames(cardStyles, classNameOverrides, { image: {} });
  return <img src={src} alt={alt} className={classNames.image} {...props} />;
};

CardImage.displayName = "DS_CardImage";
