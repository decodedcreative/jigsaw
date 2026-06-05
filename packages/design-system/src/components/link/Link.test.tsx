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
    const { container } = render(<Link href="/">Default Link</Link>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders accent variant', () => {
    render(<Link href="/" variant="accent">Accent</Link>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders subtle variant', () => {
    render(<Link href="/" variant="subtle">Subtle</Link>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders muted variant', () => {
    render(<Link href="/" variant="muted">Muted</Link>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders sm size', () => {
    render(<Link href="/" size="sm">Small</Link>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders lg size', () => {
    render(<Link href="/" size="lg">Large</Link>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('passes additional attributes', () => {
    render(<Link href="/" data-testid="my-link">Link</Link>);
    expect(screen.getByTestId('my-link')).toBeInTheDocument();
  });

  it('merges className onto the link root', () => {
    const { container } = render(
      <Link href="/" className="ring-2 ring-brand-primary">
        Link
      </Link>
    );
    const link = container.firstElementChild;
    expect(link).toHaveClass('inline-flex');
    expect(link).toHaveClass('ring-2');
    expect(link).toHaveClass('ring-brand-primary');
  });

  it('merges classNameOverrides.component onto the link root', () => {
    const { container } = render(
      <Link href="/" classNameOverrides={{ component: 'ring-2 ring-brand-primary' }}>
        Link
      </Link>
    );
    const link = container.firstElementChild;
    expect(link).toHaveClass('ring-2');
    expect(link).toHaveClass('ring-brand-primary');
  });

  it('merges classNameOverrides.component and className together', () => {
    const { container } = render(
      <Link
        href="/"
        classNameOverrides={{ component: 'mt-2' }}
        className="ring-2 ring-brand-primary"
      >
        Link
      </Link>
    );
    const link = container.firstElementChild;
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
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders secondary variant', () => {
    render(<LinkButton href="/" variant="secondary">Secondary</LinkButton>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders outline variant', () => {
    render(<LinkButton href="/" variant="outline">Outline</LinkButton>);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('merges className onto the link button root', () => {
    const { container } = render(
      <LinkButton href="/" className="ring-2 ring-brand-primary">
        Action
      </LinkButton>
    );
    const linkButton = container.firstElementChild;
    expect(linkButton).toHaveClass('inline-flex');
    expect(linkButton).toHaveClass('ring-2');
    expect(linkButton).toHaveClass('ring-brand-primary');
  });

  it('merges classNameOverrides.component onto the link button root', () => {
    const { container } = render(
      <LinkButton href="/" classNameOverrides={{ component: 'ring-2 ring-brand-primary' }}>
        Action
      </LinkButton>
    );
    const linkButton = container.firstElementChild;
    expect(linkButton).toHaveClass('ring-2');
    expect(linkButton).toHaveClass('ring-brand-primary');
  });

  it('merges classNameOverrides.component and className together', () => {
    const { container } = render(
      <LinkButton
        href="/"
        classNameOverrides={{ component: 'mt-2' }}
        className="ring-2 ring-brand-primary"
      >
        Action
      </LinkButton>
    );
    const linkButton = container.firstElementChild;
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
