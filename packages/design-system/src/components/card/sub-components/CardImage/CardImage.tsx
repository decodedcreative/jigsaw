"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { cardImageStyles } from "./CardImage.styles";
import type { CardImageProps } from "./CardImage.types";

export const CardImage: FC<CardImageProps> = ({ src, alt, classNameOverrides, ...props }: CardImageProps) => {
  const classNames = useGetClassNames(cardImageStyles, classNameOverrides, { image: {} });
  return <img src={src} alt={alt} className={classNames.image} {...props} />;
};

CardImage.displayName = "DS_CardImage";
