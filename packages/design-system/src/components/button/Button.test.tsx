import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

afterEach(() => {
  cleanup();
});

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders primary variant', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass('bg-interactive-primary');
  });

  it('renders secondary variant', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toHaveClass('bg-surface-muted');
  });

  it('renders outline variant', () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    expect(container.firstChild).toHaveClass('bg-transparent');
  });

  it('renders accent variant', () => {
    const { container } = render(<Button variant="accent">Accent</Button>);
    expect(container.firstChild).toHaveClass('bg-interactive-accent');
  });

  it('renders ghost variant', () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    expect(container.firstChild).toHaveClass('bg-transparent');
  });

  it('renders destructive variant', () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    expect(container.firstChild).toHaveClass('bg-interactive-destructive');
  });

  it('renders sm size', () => {
    const { container } = render(<Button size="sm">Small</Button>);
    expect(container.firstChild).toHaveClass('text-xs');
  });

  it('renders md size', () => {
    const { container } = render(<Button size="md">Medium</Button>);
    expect(container.firstChild).toHaveClass('text-sm');
  });

  it('renders lg size', () => {
    const { container } = render(<Button size="lg">Large</Button>);
    expect(container.firstChild).toHaveClass('text-base');
  });

  it('fires onPress when clicked', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(<Button isDisabled onPress={onPress}>Disabled</Button>);
    await user.click(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('has data-disabled attribute when isDisabled', () => {
    render(<Button isDisabled>Disabled</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-disabled');
  });

  it('passes additional HTML attributes', () => {
    render(<Button data-testid="custom-button">Button</Button>);
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
  });

  it('applies custom className via classNameOverrides', () => {
    const { container } = render(
      <Button classNameOverrides={{ component: ['custom-class'] }}>Button</Button>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
