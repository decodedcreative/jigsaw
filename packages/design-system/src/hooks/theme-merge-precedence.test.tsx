import { describe, it, expect, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { createElement } from "react";
import { ThemeProvider } from "@providers/theme";
import { configureTwMerge, resetThemeConfig, type TwMergeFn } from "../theme/config";
import { useGetClassNames } from "./useGetClassNames";
import { useRootClassName } from "./useRootClassName";

afterEach(() => {
  resetThemeConfig();
});

const styles = {
  component: () => "px-2",
};

describe("theme hook merge precedence", () => {
  it("useGetClassNames uses module configure when ThemeProvider has no twMerge", () => {
    const configured = ((..._classes: (string | undefined)[]) =>
      "from-config") as TwMergeFn;
    configureTwMerge(configured);

    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(ThemeProvider, { children });

    const { result } = renderHook(
      () => useGetClassNames(styles, { component: "px-4" }),
      { wrapper }
    );

    expect(result.current.component).toBe("from-config");
  });

  it("useGetClassNames prefers ThemeProvider twMerge over module configure", () => {
    const configured = ((..._classes: (string | undefined)[]) =>
      "from-config") as TwMergeFn;
    const nested = ((..._classes: (string | undefined)[]) =>
      "from-provider") as TwMergeFn;
    configureTwMerge(configured);

    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(ThemeProvider, { value: { twMerge: nested }, children });

    const { result } = renderHook(
      () => useGetClassNames(styles, { component: "px-4" }),
      { wrapper }
    );

    expect(result.current.component).toBe("from-provider");
  });

  it("useRootClassName prefers ThemeProvider twMerge over module configure", () => {
    const configured = ((..._classes: (string | undefined)[]) =>
      "from-config") as TwMergeFn;
    const nested = ((..._classes: (string | undefined)[]) =>
      "from-provider") as TwMergeFn;
    configureTwMerge(configured);

    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(ThemeProvider, { value: { twMerge: nested }, children });

    const { result } = renderHook(
      () => useRootClassName("px-2", "px-4"),
      { wrapper }
    );

    expect(result.current).toBe("from-provider");
  });
});
