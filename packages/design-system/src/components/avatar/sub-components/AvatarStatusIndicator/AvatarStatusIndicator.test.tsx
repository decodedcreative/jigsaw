import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { AvatarStatusIndicator } from './AvatarStatusIndicator';

afterEach(() => {
  cleanup();
});

describe('AvatarStatusIndicator', () => {
  it('renders with default offline status', () => {
    const { container } = render(<AvatarStatusIndicator />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders online status', () => {
    const { container } = render(<AvatarStatusIndicator status="online" />);
    expect(container.firstChild).toHaveClass('bg-state-success-text');
  });

  it('renders busy status', () => {
    const { container } = render(<AvatarStatusIndicator status="busy" />);
    expect(container.firstChild).toHaveClass('bg-state-error-text');
  });

  it('renders away status', () => {
    const { container } = render(<AvatarStatusIndicator status="away" />);
    expect(container.firstChild).toHaveClass('bg-state-warning-text');
  });

  it('renders with sm size', () => {
    const { container } = render(<AvatarStatusIndicator size="sm" />);
    expect(container.firstChild).toHaveClass('w-2');
  });

  it('renders a span element', () => {
    const { container } = render(<AvatarStatusIndicator />);
    expect(container.querySelector('span')).toBeInTheDocument();
  });
});
