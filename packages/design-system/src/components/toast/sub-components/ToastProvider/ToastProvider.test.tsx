import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useToast } from "../../Toast.context";
import { ToastProvider } from "./ToastProvider";

afterEach(() => {
  cleanup();
});

describe("useToast", () => {
  it("throws when used outside of ToastProvider", () => {
    const { result } = renderHook(() => {
      try {
        return useToast();
      } catch (e) {
        return e;
      }
    });
    expect(result.current).toBeInstanceOf(Error);
    expect((result.current as Error).message).toMatch(/ToastProvider/);
  });

  it("returns addToast and removeToast when used inside ToastProvider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(typeof result.current.addToast).toBe("function");
    expect(typeof result.current.removeToast).toBe("function");
    expect(Array.isArray(result.current.toasts)).toBe(true);
  });
});

describe("ToastProvider", () => {
  it("renders children", () => {
    render(
      <ToastProvider>
        <span>App content</span>
      </ToastProvider>
    );
    expect(screen.getByText("App content")).toBeInTheDocument();
  });

  it('addToast renders a toast with role="alert"', async () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button type="button" onClick={() => addToast({ title: "Hello!", duration: 0 })}>
          Show Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Show Toast" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });

  it("renders toast with description", async () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button
          type="button"
          onClick={() => addToast({ title: "Title", description: "Details here", duration: 0 })}
        >
          Add
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByText("Details here")).toBeInTheDocument();
  });

  it("removeToast removes a toast", async () => {
    const TestComponent = () => {
      const { addToast, removeToast, toasts } = useToast();
      return (
        <>
          <button type="button" onClick={() => addToast({ title: "Removable", duration: 0 })}>
            Add
          </button>
          {toasts.map((t) => (
            <button key={t.id} type="button" onClick={() => removeToast(t.id)}>
              Remove
            </button>
          ))}
        </>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
