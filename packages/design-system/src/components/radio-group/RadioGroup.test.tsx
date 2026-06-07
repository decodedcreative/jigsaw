import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from './RadioGroup';

afterEach(() => {
  cleanup();
});

describe('RadioGroup', () => {
  it('renders with a label', () => {
    render(
      <RadioGroup label="Color">
        <RadioGroup.Item label="Red" value="red" />
      </RadioGroup>
    );
    expect(screen.getByText('Color')).toBeInTheDocument();
  });

  it('renders a radiogroup element', () => {
    render(
      <RadioGroup label="Options">
        <RadioGroup.Item label="Option A" value="a" />
      </RadioGroup>
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders child radio items', () => {
    render(
      <RadioGroup label="Size">
        <RadioGroup.Item label="Small" value="sm" />
        <RadioGroup.Item label="Large" value="lg" />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('renders description text', () => {
    render(
      <RadioGroup label="Tier" description="Choose your plan">
        <RadioGroup.Item label="Basic" value="basic" />
      </RadioGroup>
    );
    expect(screen.getByText('Choose your plan')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <RadioGroup label="Tier" errorMessage="Please select a tier">
        <RadioGroup.Item label="Basic" value="basic" />
      </RadioGroup>
    );
    expect(screen.getByText('Please select a tier')).toBeInTheDocument();
  });

  it('disables all radios when isDisabled', () => {
    render(
      <RadioGroup label="Options" isDisabled>
        <RadioGroup.Item label="A" value="a" />
        <RadioGroup.Item label="B" value="b" />
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
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item label="Option B" value="b" />
      </RadioGroup>
    );
    await user.click(screen.getByRole('radio', { name: 'Option A' }));
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('renders with a defaultValue', () => {
    render(
      <RadioGroup label="Options" defaultValue="b">
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item label="Option B" value="b" />
      </RadioGroup>
    );
    expect(screen.getByRole('radio', { name: 'Option B' })).toBeChecked();
  });

  it('merges classNameOverrides.group onto the group root', () => {
    render(
      <RadioGroup label="Group" classNameOverrides={{ group: 'mt-2' }} data-testid="my-group">
        <RadioGroup.Item label="Option A" value="a" />
      </RadioGroup>
    );
    expect(screen.getByTestId('my-group')).toHaveClass('mt-2');
  });

  it('merges classNameOverrides.group and className together', () => {
    render(
      <RadioGroup
        label="Group"
        classNameOverrides={{ group: 'mt-2' }}
        className="p-4"
        data-testid="my-group"
      >
        <RadioGroup.Item label="Option A" value="a" />
      </RadioGroup>
    );
    const root = screen.getByTestId('my-group');
    expect(root).toHaveClass('mt-2');
    expect(root).toHaveClass('p-4');
  });

  it('merges classNameOverrides.item onto all radio items', () => {
    render(
      <RadioGroup
        label="Group"
        classNameOverrides={{
          item: { wrapper: 'gap-4' },
        }}
      >
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item label="Option B" value="b" />
      </RadioGroup>
    );
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio.closest('label')).toHaveClass('gap-4');
    });
  });

  it('merges classNameOverrides.item onto fragment-wrapped radio items', () => {
    render(
      <RadioGroup
        label="Group"
        classNameOverrides={{
          item: { wrapper: 'gap-4' },
        }}
      >
        <>
          <RadioGroup.Item label="Option A" value="a" />
          <RadioGroup.Item label="Option B" value="b" />
        </>
      </RadioGroup>
    );
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio.closest('label')).toHaveClass('gap-4');
    });
  });

  it('applies error styling to all items when group has errorMessage', () => {
    render(
      <RadioGroup label="Group" errorMessage="Required">
        <RadioGroup.Item label="Option A" value="a" />
        <RadioGroup.Item label="Option B" value="b" />
      </RadioGroup>
    );
    screen.getAllByRole('radio').forEach((radio) => {
      const circle = radio.closest('label')?.querySelector('div');
      expect(circle).toHaveClass('border-state-error');
    });
  });

  it('applies error styling to all items when group isInvalid', () => {
    render(
      <RadioGroup label="Group" isInvalid>
        <RadioGroup.Item label="Option A" value="a" />
      </RadioGroup>
    );
    const circle = screen.getByRole('radio').closest('label')?.querySelector('div');
    expect(circle).toHaveClass('border-state-error');
  });
});

describe('RadioGroup.Item', () => {
  it('renders a radio input', () => {
    render(
      <RadioGroup label="Group">
        <RadioGroup.Item label="Choice" value="choice" />
      </RadioGroup>
    );
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders with label text', () => {
    render(
      <RadioGroup label="Group">
        <RadioGroup.Item label="My Option" value="opt" />
      </RadioGroup>
    );
    expect(screen.getByText('My Option')).toBeInTheDocument();
  });

  it('renders children as label when no label prop given', () => {
    render(
      <RadioGroup label="Group">
        <RadioGroup.Item value="opt">Custom Label</RadioGroup.Item>
      </RadioGroup>
    );
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <RadioGroup label="Group">
        <RadioGroup.Item label="Option" value="opt" description="This is the best option" />
      </RadioGroup>
    );
    expect(screen.getByText('This is the best option')).toBeInTheDocument();
  });
});
