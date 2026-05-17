import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Disclosure, DisclosureGroup } from './Disclosure';

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
});
