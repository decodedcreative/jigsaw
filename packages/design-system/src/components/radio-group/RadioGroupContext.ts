"use client";

import { createContext, useContext } from "react";
import type { RadioGroupItemClassNameOverrides } from "./RadioGroupItem.types";

export type RadioGroupContextValue = {
  itemClassNameOverrides?: RadioGroupItemClassNameOverrides;
  groupHasError: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const RadioGroupProvider = RadioGroupContext.Provider;

export const useRadioGroupContext = () => useContext(RadioGroupContext);
