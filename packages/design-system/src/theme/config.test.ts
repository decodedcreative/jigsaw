import { describe, it, expect, afterEach } from "vitest";
import { extendTailwindMerge } from "tailwind-merge";
import { getClassNames } from "@utils/getClassNames";
import {
  configureTheme,
  configureTwMerge,
  getThemeConfig,
  getTwMerge,
  resetThemeConfig,
  type TwMergeFn,
} from "./config";

afterEach(() => {
  resetThemeConfig();
});

describe("configureTheme / configureTwMerge", () => {
  it("defaults to stock twMerge when nothing is configured", () => {
    expect(getTwMerge()("px-2 px-4")).toBe("px-4");
    expect(getThemeConfig().twMerge).toBe(getTwMerge());
  });

  it("configureTwMerge replaces the app-wide merge function", () => {
    const custom = extendTailwindMerge({
      extend: {
        classGroups: {
          "font-size": [{ text: ["display"] }],
        },
      },
    });

    configureTwMerge(custom);

    expect(getTwMerge()).toBe(custom);
  });

  it("configureTheme merges partial config", () => {
    const custom = extendTailwindMerge({});
    configureTheme({ twMerge: custom });
    expect(getTwMerge()).toBe(custom);
  });

  it("getClassNames uses the configured twMerge by default", () => {
    const calls: string[][] = [];
    const trackingMerge: TwMergeFn = ((...classes: (string | undefined)[]) => {
      const args = classes.filter((c): c is string => Boolean(c));
      calls.push(args);
      return args.join(" ");
    }) as TwMergeFn;

    configureTwMerge(trackingMerge);

    const styles = {
      component: () => "px-2",
    };

    getClassNames(styles, { component: "px-4" });

    expect(calls).toEqual([["px-2", "px-4"]]);
  });

  it("explicit twMergeFn argument still overrides the configured default", () => {
    const configured = ((..._classes: (string | undefined)[]) =>
      "from-config") as TwMergeFn;
    const explicit = ((..._classes: (string | undefined)[]) =>
      "from-arg") as TwMergeFn;

    configureTwMerge(configured);

    const styles = {
      component: () => "base",
    };

    const result = getClassNames(styles, { component: "override" }, {}, explicit);

    expect(result.component).toBe("from-arg");
  });

  it("resetThemeConfig restores the stock merge function", () => {
    const custom = extendTailwindMerge({});
    configureTwMerge(custom);
    resetThemeConfig();
    expect(getTwMerge()("px-2 px-4")).toBe("px-4");
  });

  it("configureTwMerge throws when given a non-function", () => {
    expect(() =>
      configureTwMerge("not-a-fn" as unknown as TwMergeFn)
    ).toThrow(TypeError);
  });
});
