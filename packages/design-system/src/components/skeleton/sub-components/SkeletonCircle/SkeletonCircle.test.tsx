import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { SkeletonCircle } from './SkeletonCircle';

afterEach(() => {
  cleanup();
});

describe('SkeletonCircle', () => {
  it('renders a div element', () => {
    const { container } = render(<SkeletonCircle />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders with default size of 40x40', () => {
    const { container } = render(<SkeletonCircle />);
    expect(container.firstChild).toHaveStyle({ width: '40px', height: '40px' });
  });

  it('accepts custom size', () => {
    const { container } = render(<SkeletonCircle width={64} height={64} />);
    expect(container.firstChild).toHaveStyle({ width: '64px', height: '64px' });
  });
});
