import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';
import { SelectItem } from './sub-components/SelectItem';

afterEach(() => {
  cleanup();
});

describe('Select', () => {
  const renderSelect = () =>
    render(
      <Select label="Fruit">
        <SelectItem id="apple">Apple</SelectItem>
        <SelectItem id="banana">Banana</SelectItem>
        <SelectItem id="cherry">Cherry</SelectItem>
      </Select>
    );

  it('renders a trigger button', () => {
    renderSelect();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders a label', () => {
    renderSelect();
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('shows default placeholder text', () => {
    renderSelect();
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('shows custom placeholder text', () => {
    render(
      <Select label="Color" placeholder="Pick a color">
        <SelectItem id="red">Red</SelectItem>
      </Select>
    );
    expect(screen.getByText('Pick a color')).toBeInTheDocument();
  });

  it('opens listbox on button click', async () => {
    const user = userEvent.setup();
    renderSelect();
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('renders items in the listbox when open', async () => {
    const user = userEvent.setup();
    renderSelect();
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Cherry' })).toBeInTheDocument();
  });

  it('selects an item on click', async () => {
    const user = userEvent.setup();
    renderSelect();
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: 'Banana' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Banana');
  });

  it('closes listbox after selecting an item', async () => {
    const user = userEvent.setup();
    renderSelect();
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: 'Apple' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders description text', () => {
    render(
      <Select label="Fruit" description="Choose your favorite">
        <SelectItem id="apple">Apple</SelectItem>
      </Select>
    );
    expect(screen.getByText('Choose your favorite')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <Select label="Fruit" errorMessage="Please select a fruit">
        <SelectItem id="apple">Apple</SelectItem>
      </Select>
    );
    expect(screen.getByText('Please select a fruit')).toBeInTheDocument();
  });

  it('is disabled when isDisabled', () => {
    renderSelect();
    render(
      <Select label="Fruit" isDisabled>
        <SelectItem id="apple">Apple</SelectItem>
      </Select>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[buttons.length - 1]).toBeDisabled();
  });

  it('calls onChange when item selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select label="Fruit" onChange={onChange}>
        <SelectItem id="apple">Apple</SelectItem>
        <SelectItem id="banana">Banana</SelectItem>
      </Select>
    );
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: 'Apple' }));
    expect(onChange).toHaveBeenCalledWith('apple');
  });
});
