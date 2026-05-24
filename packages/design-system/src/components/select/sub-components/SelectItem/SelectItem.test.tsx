import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../../Select';
import { SelectItem } from './SelectItem';

afterEach(() => {
  cleanup();
});

describe('SelectItem', () => {
  it('renders as an option when select is open', async () => {
    const user = userEvent.setup();
    render(
      <Select label="Fruit">
        <SelectItem id="apple">Apple</SelectItem>
      </Select>
    );
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
  });
});
