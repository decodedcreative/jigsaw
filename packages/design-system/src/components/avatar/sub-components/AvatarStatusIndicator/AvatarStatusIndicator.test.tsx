import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Avatar } from '../../Avatar';
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

  it('renders offline status', () => {
    const { container } = render(<AvatarStatusIndicator status="offline" />);
    expect(container.firstChild).toHaveClass('bg-foreground-tertiary');
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

  it('renders with 2xl size', () => {
    const { container } = render(<AvatarStatusIndicator size="2xl" />);
    expect(container.firstChild).toHaveClass('w-5');
  });

  it('renders a span element', () => {
    const { container } = render(<AvatarStatusIndicator />);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('exposes an accessible status label by default', () => {
    render(<AvatarStatusIndicator status="busy" />);
    expect(screen.getByLabelText('Status: Busy')).toBeInTheDocument();
  });

  it('allows aria-label override', () => {
    render(<AvatarStatusIndicator status="online" aria-label="User is available" />);
    expect(screen.getByLabelText('User is available')).toBeInTheDocument();
    expect(screen.queryByLabelText('Status: Online')).not.toBeInTheDocument();
  });

  it('inherits size from parent avatar', () => {
    const { container } = render(
      <Avatar size="xl">
        <AvatarStatusIndicator status="online" />
      </Avatar>
    );

    const statusIndicator = container.querySelector('span[aria-label="Status: Online"]');
    expect(statusIndicator).toHaveClass('w-4');
  });
});
