export const designSystemVersion = "0.0.1";

// Shared prop types
export type {
  ClassNameOverrides,
  RootClassName,
  WithoutClassName,
} from "@jsw-types/component-props";

// Theme JS config (RSC-safe) + optional client ThemeProvider for nested overrides
export * from "./theme";
export * from "./providers";

// Components (each folder owns its public barrel)
export * from "@components/avatar";
export * from "@components/badge";
export * from "@components/button";
export * from "@components/card";
export * from "@components/checkbox";
export * from "@components/checkbox-group";
export * from "@components/disclosure";
export * from "@components/form";
export * from "@components/heading";
export * from "@components/icon";
export * from "@components/input";
export * from "@components/link";
export * from "@components/modal";
export * from "@components/navigation";
export * from "@components/number-field";
export * from "@components/radio-group";
export * from "@components/search-field";
export * from "@components/select";
export * from "@components/skeleton";
export * from "@components/tabs";
export * from "@components/text";
export * from "@components/textarea";
export * from "@components/toast";
export * from "@components/tooltip";
