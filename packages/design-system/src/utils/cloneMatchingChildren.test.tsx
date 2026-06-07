import { Fragment } from "react";
import { describe, it, expect } from "vitest";
import { isValidElement, type ReactElement } from "react";
import { cloneMatchingChildren } from "./cloneMatchingChildren";

type MockItemProps = {
  label: string;
  itemClassNameOverrides?: { wrapper?: string };
  hasError?: boolean;
};

const MockItem = ({ label }: MockItemProps) => <label>{label}</label>;

const OtherComponent = ({ children }: { children: string }) => <div>{children}</div>;

describe("cloneMatchingChildren", () => {
  it("returns children unchanged when there is nothing to inject", () => {
    const children = <MockItem label="A" />;

    expect(cloneMatchingChildren(children, MockItem, {})).toBe(children);
  });

  it("clones matching items with shared props", () => {
    const result = cloneMatchingChildren(
      [<MockItem key="a" label="A" />, <MockItem key="b" label="B" />],
      MockItem,
      { itemClassNameOverrides: { wrapper: "gap-4" } }
    ) as ReactElement<MockItemProps>[];

    result.forEach((child) => {
      expect(child.props.itemClassNameOverrides).toEqual({ wrapper: "gap-4" });
    });
  });

  it("clones through Fragment wrappers", () => {
    const result = cloneMatchingChildren(
      (
        <Fragment>
          <MockItem label="A" />
          <MockItem label="B" />
        </Fragment>
      ),
      MockItem,
      { itemClassNameOverrides: { wrapper: "gap-4" } }
    ) as ReactElement<MockItemProps>[];

    result.forEach((child) => {
      expect(child.props.itemClassNameOverrides).toEqual({ wrapper: "gap-4" });
    });
  });

  it("merges props with a custom merge function", () => {
    const result = cloneMatchingChildren(
      [<MockItem key="a" label="A" hasError />],
      MockItem,
      { hasError: false },
      (child, props) => ({
        ...props,
        hasError: Boolean(child.props.hasError || props.hasError),
      })
    ) as ReactElement<MockItemProps>[];

    expect(result[0].props.hasError).toBe(true);
  });

  it("leaves non-matching children unchanged", () => {
    const other = <OtherComponent>ignored</OtherComponent>;
    const text = "plain";

    const result = cloneMatchingChildren(
      [<MockItem key="a" label="A" />, other, text],
      MockItem,
      { itemClassNameOverrides: { wrapper: "gap-4" } }
    ) as [ReactElement<MockItemProps>, typeof other, typeof text];

    expect(result[0].props.itemClassNameOverrides).toEqual({ wrapper: "gap-4" });
    expect(isValidElement(result[1]) && result[1].type).toBe(OtherComponent);
    expect(result[2]).toBe(text);
  });
});
