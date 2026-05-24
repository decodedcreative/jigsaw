import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Skeleton } from './Skeleton';

afterEach(() => {
  cleanup();
});

describe('Skeleton', () => {
  it('renders a div element', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('div')).toBeInTheDocument();
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
