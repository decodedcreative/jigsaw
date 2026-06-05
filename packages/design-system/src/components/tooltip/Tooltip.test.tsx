import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Tooltip } from './Tooltip';
import { TooltipTrigger } from './TooltipTrigger';

afterEach(() => {
  cleanup();
});

describe('Tooltip', () => {
  it('renders the trigger element', () => {
    render(
      <TooltipTrigger>
        <button>Hover me</button>
        <Tooltip>Tooltip content</Tooltip>
      </TooltipTrigger>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('tooltip is not visible by default', () => {
    render(
      <TooltipTrigger>
        <button>Trigger</button>
        <Tooltip>Hidden tooltip</Tooltip>
      </TooltipTrigger>
    );
    expect(screen.queryByText('Hidden tooltip')).not.toBeInTheDocument();
  });

  it('renders in open state when isOpen is true', () => {
    render(
      <TooltipTrigger isOpen>
        <button>Trigger</button>
        <Tooltip>Always visible</Tooltip>
      </TooltipTrigger>
    );
    expect(screen.getByText('Always visible')).toBeInTheDocument();
  });

  it('tooltip content renders correctly when open', () => {
    render(
      <TooltipTrigger isOpen>
        <button>Trigger</button>
        <Tooltip>Important tooltip text</Tooltip>
      </TooltipTrigger>
    );
    expect(screen.getByText('Important tooltip text')).toBeInTheDocument();
  });

  it('tooltip renders without arrow when showArrow is false', () => {
    render(
      <TooltipTrigger isOpen>
        <button>Trigger</button>
        <Tooltip showArrow={false}>No arrow tooltip</Tooltip>
      </TooltipTrigger>
    );
    expect(screen.getByText('No arrow tooltip')).toBeInTheDocument();
    // No SVG arrow rendered inside the tooltip
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.querySelector('svg')).toBeNull();
  });

  it('tooltip with arrow has an svg arrow', () => {
    render(
      <TooltipTrigger isOpen>
        <button>Trigger</button>
        <Tooltip showArrow>With arrow tooltip</Tooltip>
      </TooltipTrigger>
    );
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with top placement by default', () => {
    render(
      <TooltipTrigger isOpen>
        <button>Trigger</button>
        <Tooltip>Top tooltip</Tooltip>
      </TooltipTrigger>
    );
    expect(screen.getByText('Top tooltip')).toBeInTheDocument();
  });

  it('renders with bottom placement', () => {
    render(
      <TooltipTrigger isOpen>
        <button>Trigger</button>
        <Tooltip placement="bottom">Bottom tooltip</Tooltip>
      </TooltipTrigger>
    );
    expect(screen.getByText('Bottom tooltip')).toBeInTheDocument();
  });

  it('tooltip not shown when isOpen is false', () => {
    render(
      <TooltipTrigger isOpen={false}>
        <button>Trigger</button>
        <Tooltip>Hidden</Tooltip>
      </TooltipTrigger>
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('triggers can be any react element', () => {
    render(
      <TooltipTrigger isOpen>
        <button type="button">Custom trigger</button>
        <Tooltip>Custom tooltip</Tooltip>
      </TooltipTrigger>
    );
    expect(screen.getByRole('button', { name: 'Custom trigger' })).toBeInTheDocument();
    expect(screen.getByText('Custom tooltip')).toBeInTheDocument();
  });

  it('merges className onto the tooltip root via twMerge', () => {
    render(
      <TooltipTrigger isOpen>
        <button>Trigger</button>
        <Tooltip className="ring-2 ring-brand-primary">Styled tooltip</Tooltip>
      </TooltipTrigger>
    );
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveClass('rounded-md');
    expect(tooltip).toHaveClass('ring-2');
    expect(tooltip).toHaveClass('ring-brand-primary');
  });

  it('lets className override conflicting utilities from CVA defaults', () => {
    render(
      <TooltipTrigger isOpen>
        <button>Trigger</button>
        <Tooltip className="px-6">Padded tooltip</Tooltip>
      </TooltipTrigger>
    );
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveClass('px-6');
    expect(tooltip).not.toHaveClass('px-3');
  });

  it('merges classNameOverrides.component onto the tooltip root', () => {
    render(
      <TooltipTrigger isOpen>
        <button>Trigger</button>
        <Tooltip classNameOverrides={{ component: 'ring-2 ring-brand-primary' }}>
          Override styled tooltip
        </Tooltip>
      </TooltipTrigger>
    );
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveClass('rounded-md');
    expect(tooltip).toHaveClass('ring-2');
    expect(tooltip).toHaveClass('ring-brand-primary');
  });

  it('merges classNameOverrides.component and className together', () => {
    render(
      <TooltipTrigger isOpen>
        <button>Trigger</button>
        <Tooltip
          classNameOverrides={{ component: 'mt-2' }}
          className="ring-2 ring-brand-primary"
        >
          Combined styling
        </Tooltip>
      </TooltipTrigger>
    );
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveClass('mt-2');
    expect(tooltip).toHaveClass('ring-2');
    expect(tooltip).toHaveClass('ring-brand-primary');
  });
});
