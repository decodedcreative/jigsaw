import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback, AvatarStatusIndicator } from './Avatar';

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

describe('AvatarImage', () => {
  it('renders null when no src is provided', () => {
    const { container } = render(<AvatarImage alt="test" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders an img when src is provided', () => {
    render(<AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders the correct alt text', () => {
    render(<AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />);
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });

  it('hides the image on error and calls onLoadingStatusChange', () => {
    const onLoadingStatusChange = vi.fn();
    render(
      <AvatarImage
        src="https://example.com/avatar.jpg"
        alt="Avatar"
        onLoadingStatusChange={onLoadingStatusChange}
      />
    );
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(onLoadingStatusChange).toHaveBeenCalledWith('error');
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('calls onLoadingStatusChange with "loaded" on successful load', () => {
    const onLoadingStatusChange = vi.fn();
    render(
      <AvatarImage
        src="https://example.com/avatar.jpg"
        alt="Avatar"
        onLoadingStatusChange={onLoadingStatusChange}
      />
    );
    const img = screen.getByRole('img');
    fireEvent.load(img);
    expect(onLoadingStatusChange).toHaveBeenCalledWith('loaded');
  });
});

describe('AvatarFallback', () => {
  it('renders children', () => {
    render(<AvatarFallback>AB</AvatarFallback>);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('renders a span element', () => {
    const { container } = render(<AvatarFallback>AB</AvatarFallback>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });
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
