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

  it('renders media and text in separate spans', () => {
    const { container } = render(
      <Button media="⚙" aria-label="Build">
        Build
      </Button>
    );
    const spans = container.querySelectorAll('button > span');
    expect(spans).toHaveLength(2);
    expect(spans[0]).toHaveTextContent('⚙');
    expect(spans[1]).toHaveTextContent('Build');
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

  it('applies mediaOnly styles when mediaOnly is true', () => {
    const { container } = render(
      <Button variant="ghost" mediaOnly aria-label="Settings" media="⚙" />
    );
    expect(container.firstChild).toHaveClass('rounded-full', 'p-0');
    expect(container.querySelectorAll('button > span')).toHaveLength(1);
  });

  it('does not apply mediaOnly styles when media is provided without mediaOnly', () => {
    const { container } = render(
      <Button variant="ghost" aria-label="Settings" media="⚙" />
    );
    expect(container.firstChild).not.toHaveClass('rounded-full');
  });

  it('aligns full-width content to the start when mediaPosition is left', () => {
    const { container } = render(
      <Button fullWidth media="→">
        Label
      </Button>
    );
    expect(container.firstChild).toHaveClass('justify-start');
  });

  it('places media after text when mediaPosition is right', () => {
    const { container } = render(
      <Button mediaPosition="right" media="→">
        Label
      </Button>
    );
    const spans = container.querySelectorAll('button > span');
    expect(spans[0]).toHaveTextContent('Label');
    expect(spans[1]).toHaveTextContent('→');
  });

  it('applies custom className via classNameOverrides', () => {
    const { container } = render(
      <Button classNameOverrides={{ component: 'custom-class' }}>Button</Button>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
