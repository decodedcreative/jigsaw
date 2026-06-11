import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard } from './Skeleton';

afterEach(() => {
  cleanup();
});

describe('Skeleton', () => {
  it('renders a div element', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('bg-border-default');
  });

  it('applies width as inline style with number', () => {
    const { container } = render(<Skeleton width={200} />);
    expect(container.firstChild).toHaveStyle({ width: '200px' });
  });

  it('applies height as inline style with number', () => {
    const { container } = render(<Skeleton height={50} />);
    expect(container.firstChild).toHaveStyle({ height: '50px' });
  });

  it('applies width as inline style with string', () => {
    const { container } = render(<Skeleton width="100%" />);
    expect(container.firstChild).toHaveStyle({ width: '100%' });
  });

  it('applies height as inline style with string', () => {
    const { container } = render(<Skeleton height="2rem" />);
    expect(container.firstChild).toHaveStyle({ height: '2rem' });
  });

  it('passes additional HTML attributes', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('merges custom style with width/height', () => {
    const { container } = render(
      <Skeleton width={100} height={100} style={{ opacity: 0.5 }} />
    );
    expect(container.firstChild).toHaveStyle({ width: '100px', height: '100px', opacity: '0.5' });
  });
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

describe('SkeletonCard', () => {
  it('renders a div wrapper', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders multiple skeleton elements', () => {
    const { container } = render(<SkeletonCard />);
    const divs = container.querySelectorAll('div');
    // SkeletonCard renders: wrapper + 3 skeletons (each is also a div)
    expect(divs.length).toBeGreaterThan(1);
  });

  it('passes className to wrapper', () => {
    const { container } = render(<SkeletonCard className="custom-card" />);
    expect(container.firstChild).toHaveClass('custom-card');
  });
});
