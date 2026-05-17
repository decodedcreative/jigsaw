import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

afterEach(() => {
  cleanup();
});

describe('Input', () => {
  it('renders a textbox', () => {
    render(<Input label="Username" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a label', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Input label="Name" description="Your full name" />);
    expect(screen.getByText('Your full name')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Input label="Email" errorMessage="Invalid email address" />);
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('shows error message instead of description when both provided', () => {
    render(
      <Input
        label="Email"
        description="Enter email"
        errorMessage="Email is required"
      />
    );
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.queryByText('Enter email')).not.toBeInTheDocument();
  });

  it('is disabled when isDisabled is true', () => {
    render(<Input label="Field" isDisabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('allows typing', async () => {
    const user = userEvent.setup();
    render(<Input label="Field" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Field" onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'x');
    expect(onChange).toHaveBeenCalled();
  });

  it('renders with a controlled value', () => {
    render(<Input label="Field" value="controlled" onChange={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('controlled');
  });

  it('passes additional attributes', () => {
    render(<Input label="Field" data-testid="my-input" />);
    expect(screen.getByTestId('my-input')).toBeInTheDocument();
  });
});
