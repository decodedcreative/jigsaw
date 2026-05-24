import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Disclosure } from '../../Disclosure';
import { DisclosureGroup } from './DisclosureGroup';

afterEach(() => {
  cleanup();
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
