import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { AvatarFallback } from './AvatarFallback';

afterEach(() => {
  cleanup();
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
