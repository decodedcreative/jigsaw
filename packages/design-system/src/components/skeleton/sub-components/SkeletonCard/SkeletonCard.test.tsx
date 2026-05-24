import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { SkeletonCard } from './SkeletonCard';

afterEach(() => {
  cleanup();
});

describe('SkeletonCard', () => {
  it('renders a div wrapper', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders multiple skeleton elements', () => {
    const { container } = render(<SkeletonCard />);
    const divs = container.querySelectorAll('div');
    expect(divs.length).toBeGreaterThan(1);
  });

  it('passes className to wrapper', () => {
    const { container } = render(<SkeletonCard classNameOverrides={{ component: ["custom-card"] }} />);
    expect(container.firstChild).toHaveClass('custom-card');
  });
});
