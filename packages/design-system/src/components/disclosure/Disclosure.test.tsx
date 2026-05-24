import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Disclosure } from './Disclosure';

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
