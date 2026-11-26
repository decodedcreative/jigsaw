import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from "@storybook/react-vite";
import * as projectAnnotations from "./preview";

// Apply the same configuration the Storybook UI uses when stories run as tests.
// The a11y addon's annotations run axe after each story; `parameters.a11y.test`
// in preview.tsx decides whether a violation fails the test.
// More info: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
