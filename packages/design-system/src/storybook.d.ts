declare module "@storybook/react" {
  import type { ComponentType, ReactElement } from "react";

  export interface Meta<TC = unknown> {
    title?: string;
    component?: ComponentType<any>;
    parameters?: Record<string, unknown>;
    tags?: string[];
    argTypes?: Record<string, unknown>;
    [key: string]: unknown;
  }

  export interface StoryObj<TMeta = Meta> {
    args?: Record<string, unknown>;
    render?: (args: unknown) => ReactElement;
    parameters?: Record<string, unknown>;
    [key: string]: unknown;
  }
}
