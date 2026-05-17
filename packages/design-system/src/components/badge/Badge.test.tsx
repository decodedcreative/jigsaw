import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Badge } from './Badge';

afterEach(() => {
  cleanup();
});

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Badge>Beta</Badge>);
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    const { container } = render(<Badge>Span</Badge>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('renders default variant', () => {
    const { container } = render(<Badge variant="default">Default</Badge>);
    expect(container.firstChild).toHaveClass('bg-surface-secondary');
  });

  it('renders primary variant', () => {
    const { container } = render(<Badge variant="primary">Primary</Badge>);
    expect(container.firstChild).toHaveClass('bg-brand-primary');
  });

  it('renders secondary variant', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    expect(container.firstChild).toHaveClass('bg-brand-secondary');
  });

  it('renders accent variant', () => {
    const { container } = render(<Badge variant="accent">Accent</Badge>);
    expect(container.firstChild).toHaveClass('bg-brand-accent');
  });

  it('renders outline variant', () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    expect(container.firstChild).toHaveClass('bg-transparent');
  });

  it('renders success variant', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    expect(container.firstChild).toHaveClass('bg-state-success-bg');
  });

  it('renders warning variant', () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    expect(container.firstChild).toHaveClass('bg-state-warning-bg');
  });

  it('renders error variant', () => {
    const { container } = render(<Badge variant="error">Error</Badge>);
    expect(container.firstChild).toHaveClass('bg-state-error-bg');
  });

  it('renders sm size', () => {
    const { container } = render(<Badge size="sm">Small</Badge>);
    expect(container.firstChild).toHaveClass('text-xs');
  });

  it('renders md size by default', () => {
    const { container } = render(<Badge>Medium</Badge>);
    expect(container.firstChild).toHaveClass('text-sm');
  });

  it('renders lg size', () => {
    const { container } = render(<Badge size="lg">Large</Badge>);
    expect(container.firstChild).toHaveClass('px-3');
  });

  it('passes additional HTML attributes', () => {
    render(<Badge data-testid="badge">Badge</Badge>);
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  it('applies custom classNameOverrides', () => {
    const { container } = render(
      <Badge classNameOverrides={{ root: ['custom-badge'] }}>Badge</Badge>
    );
    expect(container.firstChild).toHaveClass('custom-badge');
  });
});
