"use client";

import { createContext, useContext } from "react";

export type SelectContextValue = {
  itemClassNameOverride?: string;
};

const SelectContext = createContext<SelectContextValue | null>(null);

export const SelectProvider = SelectContext.Provider;

export const useSelectContext = () => useContext(SelectContext);
