import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ModalFooter } from "./ModalFooter";

afterEach(() => {
  cleanup();
});

describe("ModalFooter", () => {
  it("renders children", () => {
    render(
      <ModalFooter>
        <button>OK</button>
      </ModalFooter>
    );
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
  });

  it("renders as a div element", () => {
    const { container } = render(<ModalFooter>Footer</ModalFooter>);
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
