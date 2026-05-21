import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

afterEach(() => {
  cleanup();
});

describe('Checkbox', () => {
  it('renders with a label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders a checkbox input', () => {
    render(<Checkbox label="Checkbox" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Checkbox label="Unchecked" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('can be checked by clicking', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Click me" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders description text', () => {
    render(<Checkbox label="Option" description="This is a description" />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('renders children as label when no label prop given', () => {
    render(<Checkbox>Custom label</Checkbox>);
    expect(screen.getByText('Custom label')).toBeInTheDocument();
  });

  it('is disabled when isDisabled is true', () => {
    render(<Checkbox label="Disabled" isDisabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('does not respond to clicks when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Disabled" isDisabled onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('can be set as defaultSelected', () => {
    render(<Checkbox label="Pre-checked" defaultSelected />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders with isSelected controlled', () => {
    render(<Checkbox label="Controlled" isSelected onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('passes additional props', () => {
    render(<Checkbox label="Test" data-testid="my-checkbox" />);
    expect(screen.getByTestId('my-checkbox')).toBeInTheDocument();
  });
});
