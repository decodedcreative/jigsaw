import { describe, expect, it } from "vitest";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { getPartProps } from "./getPartProps";

const styles = {
  component: cva("p-2", { variants: { size: { sm: "p-1", md: "p-2" } } }),
  label: cva("text-sm"),
};

describe("getPartProps", () => {
  it("gives every part its scope and its key as the part name", () => {
    const parts = getPartProps("chip", styles);

    expect(parts.component).toMatchObject({
      "data-scope": "chip",
      "data-part": "component",
    });
    expect(parts.label).toMatchObject({
      "data-scope": "chip",
      "data-part": "label",
    });
  });

  it("applies variants and overrides to each part's classes, as getClassNames does", () => {
    const parts = getPartProps(
      "chip",
      styles,
      { label: "text-lg" },
      { component: { size: "sm" } },
      twMerge,
    );

    expect(parts.component.className).toBe("p-1");
    expect(parts.label.className).toBe("text-lg");
  });
});
