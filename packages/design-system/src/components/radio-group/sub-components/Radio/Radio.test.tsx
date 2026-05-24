import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { RadioGroup } from '../../RadioGroup';
import { Radio } from './Radio';

afterEach(() => {
  cleanup();
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
