import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Tooltip } from './Tooltip';
import { TooltipTrigger } from './sub-components/TooltipTrigger';

afterEach(() => {
  cleanup();
});

describe('Tooltip', () => {
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
});
