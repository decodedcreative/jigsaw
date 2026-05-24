import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { SkeletonText } from './SkeletonText';

afterEach(() => {
  cleanup();
});

describe('SkeletonText', () => {
  it('renders a div element', () => {
    const { container } = render(<SkeletonText />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders with default height of 16', () => {
    const { container } = render(<SkeletonText />);
    expect(container.firstChild).toHaveStyle({ height: '16px' });
  });

  it('accepts width override', () => {
    const { container } = render(<SkeletonText width="80%" />);
    expect(container.firstChild).toHaveStyle({ width: '80%' });
  });
});
