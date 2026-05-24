"use client";

import type { FC } from "react";
import { useGetClassNames } from "@hooks";
import { textPresetStyles } from "./Text.presets.styles";
import type { TextAliasProps } from "./Text.types";

function textPreset(displayName: string, styleKey: keyof typeof textPresetStyles): FC<TextAliasProps> {
  const Alias: FC<TextAliasProps> = ({
    as: Component = "p",
    classNameOverrides,
    children,
    ...props
  }: TextAliasProps) => {
    const classNames = useGetClassNames({ component: textPresetStyles[styleKey] }, classNameOverrides);
    return (
      <Component className={classNames.component} {...props}>
        {children}
      </Component>
    );
  };
  Alias.displayName = displayName;
  return Alias;
}

export const Subheading = textPreset("DS_Subheading", "subheading");
export const Notice = textPreset("DS_Notice", "notice");
export const Title = textPreset("DS_Title", "title");
export const Caption = textPreset("DS_Caption", "caption");
export const Detail = textPreset("DS_Detail", "detail");
export const SectionLabel = textPreset("DS_SectionLabel", "sectionLabel");
export const Stat = textPreset("DS_Stat", "stat");
