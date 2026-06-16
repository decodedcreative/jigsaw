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
    render(
      <Button media="⚙" aria-label="Build">
        Build
      </Button>
    );
    const spans = screen.getByRole('button').querySelectorAll(':scope > span');
    expect(spans).toHaveLength(2);
    expect(spans[0]).toHaveTextContent('⚙');
    expect(spans[1]).toHaveTextContent('Build');
  });

  it('renders primary variant', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-interactive-primary');
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-surface-muted');
  });

  it('renders outline-solid variant', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  it('renders accent variant', () => {
    render(<Button variant="accent">Accent</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-interactive-accent');
  });

  it('renders ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  it('renders destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-interactive-destructive');
  });

  it('renders sm size', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-xs');
  });

  it('renders md size', () => {
    render(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-sm');
  });

  it('renders lg size', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-base');
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
    render(<Button variant="ghost" mediaOnly aria-label="Settings" media="⚙" />);
    const button = screen.getByRole('button', { name: 'Settings' });
    expect(button).toHaveClass('rounded-full', 'p-0', 'px-0!', 'py-0!');
    expect(button).not.toHaveClass('px-4', 'py-2');
    expect(button.querySelectorAll(':scope > span')).toHaveLength(1);
  });

  it('does not apply mediaOnly styles when media is provided without mediaOnly', () => {
    render(<Button variant="ghost" aria-label="Settings" media="⚙" />);
    expect(screen.getByRole('button')).not.toHaveClass('rounded-full');
  });

  it('suppresses ghost hover background when mediaOnly is true', () => {
    render(<Button variant="ghost" mediaOnly aria-label="Settings" media="⚙" />);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-transparent');
  });

  it('ignores mediaPosition when mediaOnly is true', () => {
    render(
      <Button
        variant="ghost"
        mediaOnly
        mediaPosition="right"
        aria-label="Settings"
        media="⚙"
      />
    );
    const button = screen.getByRole('button', { name: 'Settings' });
    expect(button.querySelectorAll(':scope > span')).toHaveLength(1);
    expect(button).not.toHaveClass('justify-between');
  });

  it('aligns full-width content to the start when mediaPosition is left', () => {
    render(
      <Button fullWidth media="→">
        Label
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('justify-start');
  });

  it('aligns full-width content between edges when mediaPosition is right', () => {
    render(
      <Button fullWidth mediaPosition="right" media="→">
        Label
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('justify-between');
  });

  it('places media after text when mediaPosition is right', () => {
    render(
      <Button mediaPosition="right" media="→">
        Label
      </Button>
    );
    const spans = screen.getByRole('button').querySelectorAll(':scope > span');
    expect(spans[0]).toHaveTextContent('Label');
    expect(spans[1]).toHaveTextContent('→');
  });

  it('applies custom className via classNameOverrides', () => {
    render(<Button classNameOverrides={{ component: 'custom-class' }}>Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
