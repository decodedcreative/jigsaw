import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Avatar } from './Avatar';
import { AvatarFallback } from './sub-components/AvatarFallback';
import { AvatarImage } from './sub-components/AvatarImage';
import { AvatarStatusIndicator } from './sub-components/AvatarStatusIndicator';

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

  it('merges classNameOverrides.component via twMerge', () => {
    const { container } = render(
      <Avatar classNameOverrides={{ component: "ring-2 ring-brand-primary" }} />
    );
    expect(container.firstChild).toHaveClass('w-10');
    expect(container.firstChild).toHaveClass('ring-2');
    expect(container.firstChild).toHaveClass('ring-brand-primary');
  });

  it('renders composed image and fallback sub-components together', () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByRole('img', { name: 'User avatar' })).toBeInTheDocument();
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('inherits avatar size for status indicator', () => {
    const { container } = render(
      <Avatar size="lg">
        <AvatarStatusIndicator status="online" />
      </Avatar>
    );

    const statusIndicator = container.querySelector('span[aria-label="Status: Online"]');
    expect(statusIndicator).toHaveClass('w-3');
    expect(statusIndicator).not.toHaveClass('w-2.5');
  });

  it('allows status indicator size override', () => {
    const { container } = render(
      <Avatar size="lg">
        <AvatarStatusIndicator status="online" size="sm" />
      </Avatar>
    );

    const statusIndicator = container.querySelector('span[aria-label="Status: Online"]');
    expect(statusIndicator).toHaveClass('w-2');
    expect(statusIndicator).not.toHaveClass('w-3');
  });
});
