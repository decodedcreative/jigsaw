import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';

afterEach(() => {
  cleanup();
});

describe('Avatar', () => {
  it('renders with default props', () => {
    const { container } = render(<Avatar />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders initials', () => {
    render(<Avatar initials="AB" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('applies size variants', () => {
    const { container } = render(<Avatar size="lg" initials="AB" />);
    expect(container.firstChild).toHaveClass('w-12');
  });

  it('applies sm size', () => {
    const { container } = render(<Avatar size="sm" initials="AB" />);
    expect(container.firstChild).toHaveClass('w-8');
  });

  it('applies xl size', () => {
    const { container } = render(<Avatar size="xl" initials="AB" />);
    expect(container.firstChild).toHaveClass('w-16');
  });

  it('applies default md size', () => {
    const { container } = render(<Avatar initials="AB" />);
    expect(container.firstChild).toHaveClass('w-10');
  });

  it('passes additional HTML attributes', () => {
    render(<Avatar data-testid="avatar" initials="AB" />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('merges classNameOverrides.component via twMerge', () => {
    const { container } = render(
      <Avatar initials="AB" classNameOverrides={{ component: "ring-2 ring-brand-primary" }} />
    );
    expect(container.firstChild).toHaveClass('w-10');
    expect(container.firstChild).toHaveClass('ring-2');
    expect(container.firstChild).toHaveClass('ring-brand-primary');
  });

  it('renders an image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User avatar" initials="AB" />);
    expect(screen.getByRole('img', { name: 'User avatar' })).toBeInTheDocument();
  });

  it('shows initials when image fails to load', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User" initials="AB" />);
    fireEvent.error(screen.getByRole('img', { name: 'User' }));
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('renders status indicator with accessible label', () => {
    render(<Avatar initials="JH" status="online" />);
    expect(screen.getByLabelText('Status: Online')).toBeInTheDocument();
  });

  it('allows status label override', () => {
    render(<Avatar initials="JH" status="busy" statusLabel="User is in a meeting" />);
    expect(screen.getByLabelText('User is in a meeting')).toBeInTheDocument();
  });

  it('sizes status indicator with avatar size', () => {
    const { container } = render(<Avatar size="lg" initials="JH" status="online" />);
    const statusIndicator = container.querySelector('span[aria-label="Status: Online"]');
    expect(statusIndicator).toHaveClass('w-3');
  });

  it('renders offline status styling', () => {
    const { container } = render(<Avatar initials="JH" status="offline" />);
    const statusIndicator = container.querySelector('span[aria-label="Status: Offline"]');
    expect(statusIndicator).toHaveClass('bg-foreground-tertiary');
  });

  it('hides initials while image is loaded', () => {
    render(
      <Avatar src="https://example.com/avatar.jpg" alt="User avatar" initials="AB" />
    );
    expect(screen.getByRole('img', { name: 'User avatar' })).toBeInTheDocument();
    expect(screen.queryByText('AB')).not.toBeInTheDocument();
  });

  it('shows empty placeholder when image fails and no initials', () => {
    const { container } = render(
      <Avatar src="https://example.com/avatar.jpg" alt="User" />
    );
    fireEvent.error(screen.getByRole('img', { name: 'User' }));
    expect(screen.queryByRole('img')).toBeNull();
    expect(container.querySelector('span')).toBeNull();
  });
});
