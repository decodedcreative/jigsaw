import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Link } from "./Link";
import { LinkButton, ButtonLink } from "./LinkButton";

afterEach(() => {
  cleanup();
});

describe('Link', () => {
  it('renders a link element', () => {
    render(<Link href="/home">Home</Link>);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Link href="/about">About Us</Link>);
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  it('renders with href', () => {
    render(<Link href="/contact">Contact</Link>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/contact');
  });

  it('renders default variant', () => {
    render(<Link href="/">Default Link</Link>);
    expect(screen.getByRole('link')).toHaveClass('text-interactive-primary');
  });

  it('renders accent variant', () => {
    render(<Link href="/" variant="accent">Accent</Link>);
    expect(screen.getByRole('link')).toHaveClass('text-interactive-accent');
  });

  it('renders subtle variant', () => {
    render(<Link href="/" variant="subtle">Subtle</Link>);
    expect(screen.getByRole('link')).toHaveClass('text-foreground-secondary');
  });

  it('renders muted variant', () => {
    render(<Link href="/" variant="muted">Muted</Link>);
    expect(screen.getByRole('link')).toHaveClass('text-foreground-muted');
  });

  it('renders sm size', () => {
    render(<Link href="/" size="sm">Small</Link>);
    expect(screen.getByRole('link')).toHaveClass('text-xs');
  });

  it('renders lg size', () => {
    render(<Link href="/" size="lg">Large</Link>);
    expect(screen.getByRole('link')).toHaveClass('text-base');
  });

  it('passes additional attributes', () => {
    render(<Link href="/" data-testid="my-link">Link</Link>);
    expect(screen.getByTestId('my-link')).toBeInTheDocument();
  });

  it('merges className onto the link root', () => {
    render(
      <Link href="/" className="ring-2 ring-brand-primary">
        Link
      </Link>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('inline-flex');
    expect(link).toHaveClass('ring-2');
    expect(link).toHaveClass('ring-brand-primary');
  });

  it('lets className override conflicting utilities from CVA defaults', () => {
    render(
      <Link href="/" size="sm" className="text-base">
        Sized link
      </Link>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-base');
    expect(link).not.toHaveClass('text-xs');
  });

  it('merges classNameOverrides.component onto the link root', () => {
    render(
      <Link href="/" classNameOverrides={{ component: 'ring-2 ring-brand-primary' }}>
        Link
      </Link>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('ring-2');
    expect(link).toHaveClass('ring-brand-primary');
  });

  it('merges classNameOverrides.component and className together', () => {
    render(
      <Link
        href="/"
        classNameOverrides={{ component: 'mt-2' }}
        className="ring-2 ring-brand-primary"
      >
        Link
      </Link>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('mt-2');
    expect(link).toHaveClass('ring-2');
    expect(link).toHaveClass('ring-brand-primary');
  });
});

describe('LinkButton', () => {
  it('renders a link element', () => {
    render(<LinkButton href="/action">Take Action</LinkButton>);
    expect(screen.getByRole('link', { name: 'Take Action' })).toBeInTheDocument();
  });

  it('renders with href', () => {
    render(<LinkButton href="/action">Action</LinkButton>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/action');
  });

  it('renders primary variant by default', () => {
    render(<LinkButton href="/">Primary</LinkButton>);
    expect(screen.getByRole('link')).toHaveClass('bg-interactive-primary');
  });

  it('renders secondary variant', () => {
    render(<LinkButton href="/" variant="secondary">Secondary</LinkButton>);
    expect(screen.getByRole('link')).toHaveClass('bg-surface-muted');
  });

  it('renders outline variant', () => {
    render(<LinkButton href="/" variant="outline">Outline</LinkButton>);
    expect(screen.getByRole('link')).toHaveClass('border-border-strong');
  });

  it('merges className onto the link button root', () => {
    render(
      <LinkButton href="/" className="ring-2 ring-brand-primary">
        Action
      </LinkButton>
    );
    const linkButton = screen.getByRole('link');
    expect(linkButton).toHaveClass('inline-flex');
    expect(linkButton).toHaveClass('ring-2');
    expect(linkButton).toHaveClass('ring-brand-primary');
  });

  it('merges classNameOverrides.component onto the link button root', () => {
    render(
      <LinkButton href="/" classNameOverrides={{ component: 'ring-2 ring-brand-primary' }}>
        Action
      </LinkButton>
    );
    const linkButton = screen.getByRole('link');
    expect(linkButton).toHaveClass('ring-2');
    expect(linkButton).toHaveClass('ring-brand-primary');
  });

  it('merges classNameOverrides.component and className together', () => {
    render(
      <LinkButton
        href="/"
        classNameOverrides={{ component: 'mt-2' }}
        className="ring-2 ring-brand-primary"
      >
        Action
      </LinkButton>
    );
    const linkButton = screen.getByRole('link');
    expect(linkButton).toHaveClass('mt-2');
    expect(linkButton).toHaveClass('ring-2');
    expect(linkButton).toHaveClass('ring-brand-primary');
  });
});

describe('ButtonLink', () => {
  it('is an alias for LinkButton', () => {
    render(<ButtonLink href="/path">ButtonLink</ButtonLink>);
    expect(screen.getByRole('link', { name: 'ButtonLink' })).toBeInTheDocument();
  });

  it('renders with href', () => {
    render(<ButtonLink href="/path">Link</ButtonLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/path');
  });
});
