import { describe, it, expect } from "vitest";
import { isValidElement, type ReactElement } from "react";
import { applyItemClassNameOverrides } from "./applyItemClassNameOverrides";

type MockItemProps = {
  label: string;
  itemClassNameOverrides?: { wrapper?: string };
};

const MockItem = ({ label }: MockItemProps) => <label>{label}</label>;

const OtherComponent = ({ children }: { children: string }) => <div>{children}</div>;

describe("applyItemClassNameOverrides", () => {
  it("returns children unchanged when overrides are undefined", () => {
    const children = <MockItem label="A" />;

    expect(applyItemClassNameOverrides(children, MockItem, undefined)).toBe(children);
  });

  it("injects itemClassNameOverrides into matching item components", () => {
    const result = applyItemClassNameOverrides(
      [<MockItem key="a" label="A" />, <MockItem key="b" label="B" />],
      MockItem,
      { wrapper: "gap-4" }
    ) as ReactElement<MockItemProps>[];

    result.forEach((child) => {
      expect(isValidElement(child)).toBe(true);
      expect(child.props.itemClassNameOverrides).toEqual({ wrapper: "gap-4" });
    });
  });

  it("leaves non-matching children unchanged", () => {
    const other = <OtherComponent>ignored</OtherComponent>;
    const text = "plain";

    const result = applyItemClassNameOverrides(
      [<MockItem key="a" label="A" />, other, text],
      MockItem,
      { wrapper: "gap-4" }
    ) as [ReactElement<MockItemProps>, typeof other, typeof text];

    expect(result[0].props.itemClassNameOverrides).toEqual({ wrapper: "gap-4" });
    expect(isValidElement(result[1]) && result[1].type).toBe(OtherComponent);
    expect(result[2]).toBe(text);
  });
});
