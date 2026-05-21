import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchField } from './SearchField';

afterEach(() => {
  cleanup();
});

describe('SearchField', () => {
  it('renders a search input', () => {
    render(<SearchField />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders with default placeholder', () => {
    render(<SearchField />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchField placeholder="Find something..." />);
    expect(screen.getByPlaceholderText('Find something...')).toBeInTheDocument();
  });

  it('renders a label when provided', () => {
    render(<SearchField label="Search products" />);
    expect(screen.getByText('Search products')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<SearchField description="Type to search" />);
    expect(screen.getByText('Type to search')).toBeInTheDocument();
  });

  it('allows typing in the search field', async () => {
    const user = userEvent.setup();
    render(<SearchField />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'react');
    expect(input).toHaveValue('react');
  });

  it('is disabled when isDisabled is true', () => {
    render(<SearchField isDisabled />);
    expect(screen.getByRole('searchbox')).toBeDisabled();
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchField onChange={onChange} />);
    await user.type(screen.getByRole('searchbox'), 'q');
    expect(onChange).toHaveBeenCalled();
  });

  it('clears input when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchField />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'test query');
    expect(input).toHaveValue('test query');
    // Clear button is provided by SearchField - click it
    const clearButton = screen.getByRole('button');
    await user.click(clearButton);
    expect(input).toHaveValue('');
  });

  it('passes additional attributes', () => {
    render(<SearchField data-testid="search" />);
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });
});
