import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup, Radio } from './RadioGroup';

afterEach(() => {
  cleanup();
});

describe('RadioGroup', () => {
  it('renders with a label', () => {
    render(
      <RadioGroup label="Color">
        <Radio label="Red" value="red" />
      </RadioGroup>
    );
    expect(screen.getByText('Color')).toBeInTheDocument();
  });

  it('renders a radiogroup element', () => {
    render(
      <RadioGroup label="Options">
        <Radio label="Option A" value="a" />
      </RadioGroup>
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders child Radio buttons', () => {
    render(
      <RadioGroup label="Size">
        <Radio label="Small" value="sm" />
        <Radio label="Large" value="lg" />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('renders description text', () => {
    render(
      <RadioGroup label="Tier" description="Choose your plan">
        <Radio label="Basic" value="basic" />
      </RadioGroup>
    );
    expect(screen.getByText('Choose your plan')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <RadioGroup label="Tier" errorMessage="Please select a tier">
        <Radio label="Basic" value="basic" />
      </RadioGroup>
    );
    expect(screen.getByText('Please select a tier')).toBeInTheDocument();
  });

  it('disables all radios when isDisabled', () => {
    render(
      <RadioGroup label="Options" isDisabled>
        <Radio label="A" value="a" />
        <Radio label="B" value="b" />
      </RadioGroup>
    );
    const radios = screen.getAllByRole('radio');
    radios.forEach((r) => expect(r).toBeDisabled());
  });

  it('calls onChange when a radio is selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup label="Options" onChange={onChange}>
        <Radio label="Option A" value="a" />
        <Radio label="Option B" value="b" />
      </RadioGroup>
    );
    await user.click(screen.getByRole('radio', { name: 'Option A' }));
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('renders with a defaultValue', () => {
    render(
      <RadioGroup label="Options" defaultValue="b">
        <Radio label="Option A" value="a" />
        <Radio label="Option B" value="b" />
      </RadioGroup>
    );
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeChecked();
  });
});

describe('Radio', () => {
  it('renders a radio input', () => {
    render(
      <RadioGroup label="Group">
        <Radio label="Choice" value="choice" />
      </RadioGroup>
    );
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders with label text', () => {
    render(
      <RadioGroup label="Group">
        <Radio label="My Option" value="opt" />
      </RadioGroup>
    );
    expect(screen.getByText('My Option')).toBeInTheDocument();
  });

  it('renders children as label when no label prop given', () => {
    render(
      <RadioGroup label="Group">
        <Radio value="opt">Custom Label</Radio>
      </RadioGroup>
    );
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <RadioGroup label="Group">
        <Radio label="Option" value="opt" description="This is the best option" />
      </RadioGroup>
    );
    expect(screen.getByText('This is the best option')).toBeInTheDocument();
  });
});
