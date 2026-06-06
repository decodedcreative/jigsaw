import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumberField } from './NumberField';

afterEach(() => {
  cleanup();
});

describe('NumberField', () => {
  it('renders an input', () => {
    const { container } = render(<NumberField label="Quantity" />);
    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('renders a label', () => {
    render(<NumberField label="Age" />);
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders an increment button', () => {
    render(<NumberField label="Qty" />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('renders a decrement button', () => {
    render(<NumberField label="Qty" />);
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(2);
  });

  it('renders description text', () => {
    render(<NumberField label="Amount" description="Enter a number between 1 and 10" />);
    expect(screen.getByText('Enter a number between 1 and 10')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<NumberField label="Amount" errorMessage="Value must be positive" />);
    expect(screen.getByText('Value must be positive')).toBeInTheDocument();
  });

  it('is disabled when isDisabled', () => {
    const { container } = render(<NumberField label="Qty" isDisabled />);
    const input = container.querySelector('input');
    expect(input).toBeDisabled();
  });

  it('renders with a default value', () => {
    const { container } = render(<NumberField label="Count" defaultValue={5} />);
    const input = container.querySelector('input');
    expect(input).toHaveValue('5');
  });

  it('calls onChange when increment button is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberField label="Qty" defaultValue={1} onChange={onChange} />);
    const buttons = screen.getAllByRole('button');
    // Click the increment button (last one)
    await user.click(buttons[buttons.length - 1]);
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onChange when decrement button is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<NumberField label="Qty" defaultValue={5} onChange={onChange} />);
    const buttons = screen.getAllByRole('button');
    // Click the decrement button (first one)
    await user.click(buttons[0]);
    expect(onChange).toHaveBeenCalled();
  });

  it('passes additional attributes', () => {
    render(<NumberField label="Number" data-testid="number-field" />);
    expect(screen.getByTestId('number-field')).toBeInTheDocument();
  });

  it('renders with inputMode numeric', () => {
    const { container } = render(<NumberField label="Number" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('inputmode', 'numeric');
  });

  it('merges classNameOverrides.wrapper onto the field root', () => {
    render(<NumberField label="Qty" classNameOverrides={{ wrapper: 'mt-2' }} data-testid="number-field" />);
    expect(screen.getByTestId('number-field')).toHaveClass('mt-2');
  });

  it('merges classNameOverrides.input onto the input', () => {
    const { container } = render(
      <NumberField label="Qty" classNameOverrides={{ input: 'ring-2 ring-brand-primary' }} />
    );
    const input = container.querySelector('input');
    expect(input).toHaveClass('ring-2');
    expect(input).toHaveClass('ring-brand-primary');
  });

  it('merges classNameOverrides onto step buttons', () => {
    render(
      <NumberField
        label="Qty"
        classNameOverrides={{
          decrementButton: 'bg-state-error',
          incrementButton: 'bg-state-success',
        }}
      />
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('bg-state-error');
    expect(buttons[buttons.length - 1]).toHaveClass('bg-state-success');
  });

  it('merges classNameOverrides.wrapper and className together', () => {
    render(
      <NumberField
        label="Qty"
        classNameOverrides={{ wrapper: 'mt-2' }}
        className="p-4"
        data-testid="number-field"
      />
    );
    const root = screen.getByTestId('number-field');
    expect(root).toHaveClass('mt-2');
    expect(root).toHaveClass('p-4');
  });
});
