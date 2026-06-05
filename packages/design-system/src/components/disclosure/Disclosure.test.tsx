import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Disclosure } from './Disclosure';
import { DisclosureGroup } from './DisclosureGroup';

afterEach(() => {
  cleanup();
});

describe('Disclosure', () => {
  it('renders the title', () => {
    render(<Disclosure title="Section 1">Content</Disclosure>);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });

  it('renders a trigger button', () => {
    render(<Disclosure title="Trigger">Content</Disclosure>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('panel content is hidden by default', () => {
    render(<Disclosure title="Section">Hidden content</Disclosure>);
    expect(screen.queryByText('Hidden content')).not.toBeVisible();
  });

  it('shows panel content when expanded by default', () => {
    render(
      <Disclosure title="Section" defaultExpanded>
        Visible content
      </Disclosure>
    );
    expect(screen.getByText('Visible content')).toBeVisible();
  });

  it('expands panel on trigger click', async () => {
    const user = userEvent.setup();
    render(<Disclosure title="Toggle">Panel content</Disclosure>);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Panel content')).toBeVisible();
  });

  it('merges className onto the disclosure root', () => {
    render(
      <Disclosure title="Section" className="ring-2 ring-brand-primary">
        Content
      </Disclosure>
    );
    const disclosure = screen.getByRole('button').closest('[class*="rounded-md"]');
    expect(disclosure).toHaveClass('rounded-md');
    expect(disclosure).toHaveClass('ring-2');
    expect(disclosure).toHaveClass('ring-brand-primary');
  });

  it('merges classNameOverrides.component onto the disclosure root', () => {
    render(
      <Disclosure
        title="Section"
        classNameOverrides={{ component: 'ring-2 ring-brand-primary' }}
      >
        Content
      </Disclosure>
    );
    const disclosure = screen.getByRole('button').closest('[class*="rounded-md"]');
    expect(disclosure).toHaveClass('ring-2');
    expect(disclosure).toHaveClass('ring-brand-primary');
  });

  it('collapses panel on second trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Disclosure title="Toggle" defaultExpanded>
        Panel content
      </Disclosure>
    );
    await user.click(screen.getByRole('button'));
    expect(screen.queryByText('Panel content')).not.toBeVisible();
  });
});

describe('DisclosureGroup', () => {
  it('renders children disclosures', () => {
    render(
      <DisclosureGroup>
        <Disclosure title="Item 1">Content 1</Disclosure>
        <Disclosure title="Item 2">Content 2</Disclosure>
      </DisclosureGroup>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders multiple trigger buttons', () => {
    render(
      <DisclosureGroup>
        <Disclosure title="Item 1">Content 1</Disclosure>
        <Disclosure title="Item 2">Content 2</Disclosure>
      </DisclosureGroup>
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('can expand one disclosure in the group', async () => {
    const user = userEvent.setup();
    render(
      <DisclosureGroup>
        <Disclosure title="Item 1">Content 1</Disclosure>
        <Disclosure title="Item 2">Content 2</Disclosure>
      </DisclosureGroup>
    );
    await user.click(screen.getByText('Item 1'));
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('merges className onto the disclosure group root', () => {
    const { container } = render(
      <DisclosureGroup className="gap-4">
        <Disclosure title="Item 1">Content 1</Disclosure>
      </DisclosureGroup>
    );
    const group = container.firstElementChild;
    expect(group).toHaveClass('flex');
    expect(group).toHaveClass('flex-col');
    expect(group).toHaveClass('gap-4');
    expect(group).not.toHaveClass('gap-2');
  });
});
