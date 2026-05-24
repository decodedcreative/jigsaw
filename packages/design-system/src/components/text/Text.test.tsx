import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Text } from './Text';

afterEach(() => {
  cleanup();
});

describe('Text', () => {
  it('renders as a <p> element by default', () => {
    const { container } = render(<Text>Hello</Text>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('renders as a <span> when as="span"', () => {
    const { container } = render(<Text as="span">Hello</Text>);
    expect(container.querySelector('span')).toBeInTheDocument();
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Text>Body text content</Text>);
    expect(screen.getByText('Body text content')).toBeInTheDocument();
  });

  it('renders xs size', () => {
    const { container } = render(<Text size="xs">xs text</Text>);
    expect(container.firstChild).toHaveClass('text-xs');
  });

  it('renders sm size', () => {
    const { container } = render(<Text size="sm">sm text</Text>);
    expect(container.firstChild).toHaveClass('text-sm');
  });

  it('renders base size', () => {
    const { container } = render(<Text size="base">base text</Text>);
    expect(container.firstChild).toHaveClass('text-base');
  });

  it('renders lg size', () => {
    const { container } = render(<Text size="lg">lg text</Text>);
    expect(container.firstChild).toHaveClass('text-lg');
  });

  it('renders normal weight', () => {
    const { container } = render(<Text weight="normal">normal</Text>);
    expect(container.firstChild).toHaveClass('font-normal');
  });

  it('renders medium weight', () => {
    const { container } = render(<Text weight="medium">medium</Text>);
    expect(container.firstChild).toHaveClass('font-medium');
  });

  it('renders semibold weight', () => {
    const { container } = render(<Text weight="semibold">semibold</Text>);
    expect(container.firstChild).toHaveClass('font-semibold');
  });

  it('renders bold weight', () => {
    const { container } = render(<Text weight="bold">bold</Text>);
    expect(container.firstChild).toHaveClass('font-bold');
  });

  it('applies muted styles when muted is true', () => {
    const { container } = render(<Text muted>Muted text</Text>);
    expect(container.firstChild).toHaveClass('text-foreground-muted');
  });

  it('does not apply muted styles when muted is false', () => {
    const { container } = render(<Text muted={false}>Normal text</Text>);
    expect(container.firstChild).not.toHaveClass('text-foreground-muted');
  });

  it('passes additional HTML attributes', () => {
    render(<Text data-testid="custom-text">Text</Text>);
    expect(screen.getByTestId('custom-text')).toBeInTheDocument();
  });

  it('applies custom className via classNameOverrides', () => {
    const { container } = render(
      <Text classNameOverrides={{ component: ['custom-class'] }}>Text</Text>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('uses base size by default', () => {
    const { container } = render(<Text>Default text</Text>);
    expect(container.firstChild).toHaveClass('text-base');
  });

  it('uses normal weight by default', () => {
    const { container } = render(<Text>Default text</Text>);
    expect(container.firstChild).toHaveClass('font-normal');
  });
});
