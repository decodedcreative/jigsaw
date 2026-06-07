"use client";

import { createContext, useContext } from "react";

export type CheckboxGroupContextValue = {
  groupHasError: boolean;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export const CheckboxGroupProvider = CheckboxGroupContext.Provider;

export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);
