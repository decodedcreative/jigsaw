import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip, TooltipTrigger } from './Tooltip';

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
});
