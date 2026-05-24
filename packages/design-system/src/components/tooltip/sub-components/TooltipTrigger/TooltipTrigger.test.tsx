import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Tooltip } from '../../Tooltip';
import { TooltipTrigger } from './TooltipTrigger';

afterEach(() => {
  cleanup();
});

describe('TooltipTrigger', () => {
  it('renders the trigger element', () => {
    render(
      <TooltipTrigger>
        <button>Hover me</button>
        <Tooltip>Tooltip content</Tooltip>
      </TooltipTrigger>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
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
