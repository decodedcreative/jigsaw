import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea';

afterEach(() => {
  cleanup();
});

describe('Textarea', () => {
  it('renders a textbox', () => {
    render(<Textarea label="Message" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a textarea element', () => {
    const { container } = render(<Textarea label="Message" />);
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });

  it('renders a label', () => {
    render(<Textarea label="Comments" />);
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Textarea placeholder="Write your message..." />);
    expect(screen.getByPlaceholderText('Write your message...')).toBeInTheDocument();
  });

  it('renders with default rows of 4', () => {
    const { container } = render(<Textarea />);
    expect(container.querySelector('textarea')).toHaveAttribute('rows', '4');
  });

  it('renders with custom rows', () => {
    const { container } = render(<Textarea rows={8} />);
    expect(container.querySelector('textarea')).toHaveAttribute('rows', '8');
  });

  it('renders description text', () => {
    render(<Textarea label="Bio" description="Tell us about yourself" />);
    expect(screen.getByText('Tell us about yourself')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Textarea label="Bio" errorMessage="Message is required" />);
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('shows error message instead of description when both provided', () => {
    render(
      <Textarea
        label="Bio"
        description="Tell us about yourself"
        errorMessage="This field is required"
      />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.queryByText('Tell us about yourself')).not.toBeInTheDocument();
  });

  it('is disabled when isDisabled is true', () => {
    render(<Textarea label="Field" isDisabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('allows typing', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Message" />);
    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello world');
    expect(textarea).toHaveValue('Hello world');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea label="Field" onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'x');
    expect(onChange).toHaveBeenCalled();
  });

  it('renders with a controlled value', () => {
    render(<Textarea label="Field" value="initial value" onChange={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('initial value');
  });

  it('passes additional attributes', () => {
    render(<Textarea label="Field" data-testid="my-textarea" />);
    expect(screen.getByTestId('my-textarea')).toBeInTheDocument();
  });
});
