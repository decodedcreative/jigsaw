import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormFieldset, FormActions } from './Form';

afterEach(() => {
  cleanup();
});

describe('Form', () => {
  it('renders a form element', () => {
    const { container } = render(<Form>Form content</Form>);
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Form>Form content</Form>);
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('calls onSubmit when submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e) => e.preventDefault());
    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('passes additional attributes', () => {
    const { container } = render(<Form data-testid="my-form">Content</Form>);
    expect(container.querySelector('form[data-testid="my-form"]')).toBeInTheDocument();
  });
});

describe('FormFieldset', () => {
  it('renders a fieldset element', () => {
    const { container } = render(<FormFieldset>Fields</FormFieldset>);
    expect(container.querySelector('fieldset')).toBeInTheDocument();
  });

  it('renders a legend when legend prop is provided', () => {
    render(<FormFieldset legend="Personal Info">Fields</FormFieldset>);
    expect(screen.getByText('Personal Info')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<FormFieldset>Field content</FormFieldset>);
    expect(screen.getByText('Field content')).toBeInTheDocument();
  });

  it('does not render legend element when legend prop is omitted', () => {
    const { container } = render(<FormFieldset>Fields</FormFieldset>);
    expect(container.querySelector('legend')).not.toBeInTheDocument();
  });
});

describe('FormActions', () => {
  it('renders children', () => {
    render(
      <FormActions>
        <button>Cancel</button>
        <button>Save</button>
      </FormActions>
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders as a div element', () => {
    const { container } = render(<FormActions>Actions</FormActions>);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
