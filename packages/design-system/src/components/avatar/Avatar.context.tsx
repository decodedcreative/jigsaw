"use client";

import { createContext, useContext } from "react";
import type { AvatarSize } from "./Avatar.types";

const AvatarSizeContext = createContext<AvatarSize | undefined>(undefined);

export const AvatarSizeProvider = AvatarSizeContext.Provider;

export function useAvatarSize() {
  return useContext(AvatarSizeContext);
}
