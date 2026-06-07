import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

afterEach(() => {
  cleanup();
});

describe('Select', () => {
  const renderSelect = () =>
    render(
      <Select label="Fruit">
        <Select.Item id="apple">Apple</Select.Item>
        <Select.Item id="banana">Banana</Select.Item>
        <Select.Item id="cherry">Cherry</Select.Item>
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
        <Select.Item id="red">Red</Select.Item>
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
        <Select.Item id="apple">Apple</Select.Item>
      </Select>
    );
    expect(screen.getByText('Choose your favorite')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <Select label="Fruit" errorMessage="Please select a fruit">
        <Select.Item id="apple">Apple</Select.Item>
      </Select>
    );
    expect(screen.getByText('Please select a fruit')).toBeInTheDocument();
  });

  it('is disabled when isDisabled', () => {
    renderSelect();
    render(
      <Select label="Fruit" isDisabled>
        <Select.Item id="apple">Apple</Select.Item>
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
        <Select.Item id="apple">Apple</Select.Item>
        <Select.Item id="banana">Banana</Select.Item>
      </Select>
    );
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('option', { name: 'Apple' }));
    expect(onChange).toHaveBeenCalledWith('apple');
  });

  it('merges classNameOverrides.wrapper onto the field root', () => {
    render(
      <Select label="Fruit" classNameOverrides={{ wrapper: 'mt-2' }} data-testid="my-select">
        <Select.Item id="apple">Apple</Select.Item>
      </Select>
    );
    expect(screen.getByTestId('my-select')).toHaveClass('mt-2');
  });

  it('merges classNameOverrides.trigger onto the button', () => {
    render(
      <Select label="Fruit" classNameOverrides={{ trigger: 'ring-2 ring-brand-primary' }}>
        <Select.Item id="apple">Apple</Select.Item>
      </Select>
    );
    expect(screen.getByRole('button')).toHaveClass('ring-2');
    expect(screen.getByRole('button')).toHaveClass('ring-brand-primary');
  });

  it('merges classNameOverrides.wrapper and className together', () => {
    render(
      <Select
        label="Fruit"
        classNameOverrides={{ wrapper: 'mt-2' }}
        className="p-4"
        data-testid="my-select"
      >
        <Select.Item id="apple">Apple</Select.Item>
      </Select>
    );
    const root = screen.getByTestId('my-select');
    expect(root).toHaveClass('mt-2');
    expect(root).toHaveClass('p-4');
  });

  it('merges classNameOverrides.item onto all list items', async () => {
    const user = userEvent.setup();
    render(
      <Select label="Fruit" classNameOverrides={{ item: 'font-semibold' }}>
        <Select.Item id="apple">Apple</Select.Item>
        <Select.Item id="banana">Banana</Select.Item>
      </Select>
    );
    await user.click(screen.getByRole('button'));
    screen.getAllByRole('option').forEach((option) => {
      expect(option).toHaveClass('font-semibold');
    });
  });
});
