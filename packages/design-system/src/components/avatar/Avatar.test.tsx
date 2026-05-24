import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Avatar } from './Avatar';

afterEach(() => {
  cleanup();
});

describe('Avatar', () => {
  it('renders with default props', () => {
    const { container } = render(<Avatar />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Avatar><span>AB</span></Avatar>);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('applies size variants', () => {
    const { container } = render(<Avatar size="lg" />);
    expect(container.firstChild).toHaveClass('w-12');
  });

  it('applies sm size', () => {
    const { container } = render(<Avatar size="sm" />);
    expect(container.firstChild).toHaveClass('w-8');
  });

  it('applies xl size', () => {
    const { container } = render(<Avatar size="xl" />);
    expect(container.firstChild).toHaveClass('w-16');
  });

  it('applies default md size', () => {
    const { container } = render(<Avatar />);
    expect(container.firstChild).toHaveClass('w-10');
  });

  it('passes additional HTML attributes', () => {
    render(<Avatar data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });
});
