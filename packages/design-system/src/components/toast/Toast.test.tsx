import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, ToastItem, useToast } from './Toast';

afterEach(() => {
  cleanup();
});

describe('useToast', () => {
  it('throws when used outside of ToastProvider', () => {
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

  it('returns addToast and removeToast when used inside ToastProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastProvider>{children}</ToastProvider>
    );
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(typeof result.current.addToast).toBe('function');
    expect(typeof result.current.removeToast).toBe('function');
    expect(Array.isArray(result.current.toasts)).toBe(true);
  });
});

describe('ToastProvider', () => {
  it('renders children', () => {
    render(
      <ToastProvider>
        <span>App content</span>
      </ToastProvider>
    );
    expect(screen.getByText('App content')).toBeInTheDocument();
  });

  it('addToast renders a toast with role="alert"', async () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast({ title: 'Hello!', duration: 0 })}>
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
    await user.click(screen.getByRole('button', { name: 'Show Toast' }));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });

  it('renders toast with description', async () => {
    const TestComponent = () => {
      const { addToast } = useToast();
      return (
        <button onClick={() => addToast({ title: 'Title', description: 'Details here', duration: 0 })}>
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
    await user.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Details here')).toBeInTheDocument();
  });

  it('removeToast removes a toast', async () => {
    const TestComponent = () => {
      const { addToast, removeToast, toasts } = useToast();
      return (
        <>
          <button onClick={() => addToast({ title: 'Removable', duration: 0 })}>Add</button>
          {toasts.map((t) => (
            <button key={t.id} onClick={() => removeToast(t.id)}>Remove</button>
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
    await user.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Remove' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('ToastItem', () => {
  const noop = () => {};

  it('renders with role="alert"', () => {
    render(<ToastItem id="1" onClose={noop} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<ToastItem id="1" title="Success!" onClose={noop} />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ToastItem id="1" description="Your changes were saved." onClose={noop} />);
    expect(screen.getByText('Your changes were saved.')).toBeInTheDocument();
  });

  it('renders a close button with aria-label="Close"', () => {
    render(<ToastItem id="1" title="Test" onClose={noop} />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ToastItem id="1" title="Test" onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders action button when action is provided', () => {
    const action = { label: 'Undo', onClick: vi.fn() };
    render(<ToastItem id="1" title="Deleted" onClose={noop} action={action} />);
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
  });

  it('calls action.onClick when action button is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const action = { label: 'Undo', onClick };
    render(<ToastItem id="1" title="Deleted" onClose={noop} action={action} />);
    await user.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders default variant', () => {
    render(<ToastItem id="1" title="Info" onClose={noop} variant="default" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders success variant', () => {
    render(<ToastItem id="1" title="Done!" onClose={noop} variant="success" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders error variant', () => {
    render(<ToastItem id="1" title="Error" onClose={noop} variant="error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders warning variant', () => {
    render(<ToastItem id="1" title="Warning" onClose={noop} variant="warning" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
