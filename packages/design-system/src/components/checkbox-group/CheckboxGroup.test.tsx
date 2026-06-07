import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxGroup } from './CheckboxGroup';
import { Checkbox } from '../checkbox';

afterEach(() => {
  cleanup();
});

describe('CheckboxGroup', () => {
  it('renders with a label', () => {
    render(
      <CheckboxGroup label="Preferences">
        <Checkbox label="Option A" value="a" />
      </CheckboxGroup>
    );
    expect(screen.getByText('Preferences')).toBeInTheDocument();
  });

  it('renders child checkboxes', () => {
    render(
      <CheckboxGroup label="Group">
        <Checkbox label="Option A" value="a" />
        <Checkbox label="Option B" value="b" />
      </CheckboxGroup>
    );
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('renders description', () => {
    render(
      <CheckboxGroup label="Group" description="Choose all that apply">
        <Checkbox label="Option A" value="a" />
      </CheckboxGroup>
    );
    expect(screen.getByText('Choose all that apply')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <CheckboxGroup label="Group" errorMessage="Please select at least one">
        <Checkbox label="Option A" value="a" />
      </CheckboxGroup>
    );
    expect(screen.getByText('Please select at least one')).toBeInTheDocument();
  });

  it('disables all checkboxes when isDisabled', () => {
    render(
      <CheckboxGroup label="Group" isDisabled>
        <Checkbox label="Option A" value="a" />
        <Checkbox label="Option B" value="b" />
      </CheckboxGroup>
    );
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((cb) => expect(cb).toBeDisabled());
  });

  it('calls onChange when a checkbox is checked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CheckboxGroup label="Group" onChange={onChange}>
        <Checkbox label="Option A" value="a" />
      </CheckboxGroup>
    );
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  it('renders with defaultValue', () => {
    render(
      <CheckboxGroup label="Group" defaultValue={['a']}>
        <Checkbox label="Option A" value="a" />
        <Checkbox label="Option B" value="b" />
      </CheckboxGroup>
    );
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });

  it('merges classNameOverrides.group onto the group root', () => {
    render(
      <CheckboxGroup label="Group" classNameOverrides={{ group: 'mt-2' }} data-testid="my-group">
        <Checkbox label="Option A" value="a" />
      </CheckboxGroup>
    );
    expect(screen.getByTestId('my-group')).toHaveClass('mt-2');
  });

  it('merges classNameOverrides.options onto the options container', () => {
    render(
      <CheckboxGroup label="Group" classNameOverrides={{ options: 'gap-4' }}>
        <Checkbox label="Option A" value="a" />
      </CheckboxGroup>
    );
    const options = screen.getByRole('group').querySelector('.gap-4');
    expect(options).toBeInTheDocument();
  });

  it('merges classNameOverrides.group and className together', () => {
    render(
      <CheckboxGroup
        label="Group"
        classNameOverrides={{ group: 'mt-2' }}
        className="p-4"
        data-testid="my-group"
      >
        <Checkbox label="Option A" value="a" />
      </CheckboxGroup>
    );
    const root = screen.getByTestId('my-group');
    expect(root).toHaveClass('mt-2');
    expect(root).toHaveClass('p-4');
  });

  it('applies error styling to all checkboxes when group has errorMessage', () => {
    render(
      <CheckboxGroup label="Group" errorMessage="Required">
        <Checkbox label="Option A" value="a" />
        <Checkbox label="Option B" value="b" />
      </CheckboxGroup>
    );
    screen.getAllByRole('checkbox').forEach((checkbox) => {
      const box = checkbox.closest('label')?.querySelector('div');
      expect(box).toHaveClass('border-state-error');
    });
  });

  it('applies error styling to all checkboxes when group isInvalid', () => {
    render(
      <CheckboxGroup label="Group" isInvalid>
        <Checkbox label="Option A" value="a" />
      </CheckboxGroup>
    );
    const box = screen.getByRole('checkbox').closest('label')?.querySelector('div');
    expect(box).toHaveClass('border-state-error');
  });
});
