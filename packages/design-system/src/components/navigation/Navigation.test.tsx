import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Navigation,
  NavigationBrand,
  NavigationInner,
  NavigationLinks,
  NavigationLink,
  NavigationActions,
  MobileNavigation,
} from './Navigation';

afterEach(() => {
  cleanup();
});

describe('Navigation', () => {
  it('renders a nav element', () => {
    render(<Navigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Navigation><span>Nav content</span></Navigation>);
    expect(screen.getByText('Nav content')).toBeInTheDocument();
  });

  it('passes additional HTML attributes', () => {
    render(<Navigation aria-label="Main navigation" />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });
});

describe('NavigationBrand', () => {
  it('renders a link', () => {
    render(<NavigationBrand>Brand</NavigationBrand>);
    expect(screen.getByRole('link', { name: 'Brand' })).toBeInTheDocument();
  });

  it('defaults to href="/"', () => {
    render(<NavigationBrand>Brand</NavigationBrand>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('renders with custom href', () => {
    render(<NavigationBrand href="/home">Brand</NavigationBrand>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/home');
  });

  it('renders children', () => {
    render(<NavigationBrand>My Brand</NavigationBrand>);
    expect(screen.getByText('My Brand')).toBeInTheDocument();
  });
});

describe('NavigationLinks', () => {
  it('renders children', () => {
    render(
      <NavigationLinks>
        <NavigationLink href="/home">Home</NavigationLink>
      </NavigationLinks>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});

describe('NavigationLink', () => {
  it('renders a link', () => {
    render(<NavigationLink href="/about">About</NavigationLink>);
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  it('renders with correct href', () => {
    render(<NavigationLink href="/about">About</NavigationLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/about');
  });

  it('sets aria-current="page" when isCurrent is true', () => {
    render(<NavigationLink href="/about" isCurrent>About</NavigationLink>);
    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current when isCurrent is false', () => {
    render(<NavigationLink href="/about">About</NavigationLink>);
    expect(screen.getByRole('link')).not.toHaveAttribute('aria-current');
  });
});

describe('NavigationActions', () => {
  it('renders children', () => {
    render(<NavigationActions><button>Sign In</button></NavigationActions>);
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });
});

describe('NavigationInner', () => {
  it('renders children', () => {
    render(<NavigationInner>Inner content</NavigationInner>);
    expect(screen.getByText('Inner content')).toBeInTheDocument();
  });
});

describe('MobileNavigation', () => {
  const links = [
    { href: '/home', label: 'Home' },
    { href: '/about', label: 'About', isCurrent: true },
  ];

  it('renders a toggle button', () => {
    render(<MobileNavigation isOpen={false} onOpenChange={vi.fn()} links={links} />);
    expect(screen.getByRole('button', { name: 'Toggle menu' })).toBeInTheDocument();
  });

  it('does not show mobile menu when isOpen is false', () => {
    render(<MobileNavigation isOpen={false} onOpenChange={vi.fn()} links={links} />);
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('shows mobile menu when isOpen is true', () => {
    render(<MobileNavigation isOpen onOpenChange={vi.fn()} links={links} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('calls onOpenChange when toggle button is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<MobileNavigation isOpen={false} onOpenChange={onOpenChange} links={links} />);
    await user.click(screen.getByRole('button', { name: 'Toggle menu' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('has aria-expanded on the toggle button', () => {
    render(<MobileNavigation isOpen={false} onOpenChange={vi.fn()} links={links} />);
    expect(screen.getByRole('button', { name: 'Toggle menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-current="page" on the current link', () => {
    render(<MobileNavigation isOpen onOpenChange={vi.fn()} links={links} />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
  });
});
