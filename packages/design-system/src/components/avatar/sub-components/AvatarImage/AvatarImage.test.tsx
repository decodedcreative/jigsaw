import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { AvatarImage } from './AvatarImage';

afterEach(() => {
  cleanup();
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
