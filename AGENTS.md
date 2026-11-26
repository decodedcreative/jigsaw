# Jigsaw

Jigsaw is a React design system, in a Turborepo monorepo with npm workspaces. This file holds the conventions for writing and checking code in it, for people and coding agents alike. `README.md` describes the structure, and `CONTRIBUTING.md` the ticket workflow, branches and releases.

- `packages/design-system`: the React components, `@jigsaw-ds/design-system`, built on React Aria Components, Tailwind CSS v4 and CVA.
- `packages/tokens`: shared tokens and the Tailwind theme CSS, `@jigsaw-ds/tokens`.
- `packages/themes/default` and `packages/themes/portfolio`: the themes, `@jigsaw-ds/theme-default` and `@jigsaw-ds/theme-portfolio`, built with the Style Dictionary helpers in `packages/theme-build`.
- `apps/storybook`: the component docs, and the story tests.
- `apps/web`: a Next.js app that uses Jigsaw the way a product app would.

## Checks

Run these from the repo root before finishing a change. All must pass.

```sh
npm run lint                                          # ESLint, in every workspace
npm run check-types                                   # TypeScript, including tests and stories
npm run build                                         # Builds every package and app
npm test --workspace=@jigsaw-ds/design-system         # Unit tests, plus the package exports and ESM checks
npm test --workspace=@jigsaw-ds/storybook             # Story rules and Storybook's own utilities
npm run test:stories --workspace=@jigsaw-ds/storybook # Every story in headless Chromium
```

The story tests need Playwright's Chromium once: `npx playwright install chromium`. `npm run format` formats the code with Prettier.

GitHub Actions runs the same checks on every pull request, from `.github/workflows/ci.yml`, in four jobs: `test-design-system`, `lint`, `test-stories` and `test-tokens`. `main` requires `test-design-system` and `test-tokens`, and a branch that's up to date with `main`. Every push also publishes Storybook to Chromatic, which flags stories whose screenshots changed and fails on a story that throws.

## Releasing

The published packages, every `@jigsaw-ds/*` package, are released together at one version. Unlike a usual Changesets setup, **feature pull requests don't add `.changeset/*.md` files**, and CI fails if they do. Instead, the pull request description's `## Consumer changelog` section holds one sentence per change, written for an app that uses Jigsaw, with `**Breaking:**` in front of a breaking change, or `None.` when nothing an app would notice changed:

```markdown
## Consumer changelog

- `SearchField` is named "Search" when it has no label.
- **Breaking:** the design system now requires React 19.
```

A check fails a pull request that changes a published package without the section. The release script copies the sentences into each package's `CHANGELOG.md`. Don't change the packages' versions or changelogs by hand. `CONTRIBUTING.md` and `docs/publication.md` describe cutting a release.

## Design tokens and themes

- Shared tokens are JSON in `packages/tokens/src/tokens/`. Each theme's colours are JSON in its own package: `src/base/` for the palette and `src/semantic/` for the light and dark roles that reference it.
- Never edit a package's `dist/`. `npm run build` regenerates it, and `npm run dev` rebuilds the theme CSS whenever token JSON is saved.
- `packages/tokens/figma/` holds the token files exchanged with Figma. The `test-tokens` job builds and checks them.
- Use the semantic token classes in components, such as `bg-interactive-primary` and `text-foreground-secondary`, rather than palette colours.

## Adding a component

Each component gets its own folder in `packages/design-system/src/components/`, named in lower kebab-case, such as `number-field/`. `button/` is the reference example.

```
packages/design-system/src/components/number-field/
  index.ts
  NumberField.tsx
  NumberField.styles.ts
  NumberField.types.ts
  NumberField.test.tsx
  NumberField.stories.tsx
```

| File                      | Contains                                                                 |
| ------------------------- | ------------------------------------------------------------------------ |
| `NumberField.tsx`         | The component only, as a named export                                    |
| `NumberField.styles.ts`   | Its styles, as `numberFieldStyles`. See Styling components               |
| `NumberField.types.ts`    | Its exported types, with a `/** ... */` comment on each prop Jigsaw adds |
| `NumberField.test.tsx`    | Vitest and Testing Library tests                                         |
| `NumberField.stories.tsx` | Storybook stories. See Writing stories                                   |
| `index.ts`                | The component's public exports                                           |

- Use named exports only. `Card` and `Modal` still have default exports, from before this rule. Don't add more.
- Shared hooks live in `src/hooks/` and helpers in `src/utils/`. Import them through the path aliases, such as `@hooks`, `@utils` and `@jsw-types/component-props`, rather than relative paths.
- Comments say why the code is the way it is, not what values it uses.
- `npm run sync-exports --workspace=@jigsaw-ds/design-system` adds a new component to the package's `exports`, and the unit tests fail until it's run.
- A new component also needs an entry in `src/components/a11y.test.tsx`, which fails until it has one. See Writing tests.

## Declaring a component

- Type the props in the parameters, from the component's types file. Don't use `React.FC`.
- Jigsaw supports React 19 only, which passes `ref` to any function component as an ordinary prop. So don't use `forwardRef`. Take `ref` from the props and pass it to the element that receives `className`. Type it by adding `RefProp<E>` to the props type, where `E` is that element:

  ```ts
  import type { RefProp } from "@jsw-types/component-props";

  export type ButtonProps = RefProp<HTMLButtonElement> & {
    /** When true, the button spans the full width of its container. */
    fullWidth?: boolean;
  };
  ```

- Set `displayName` to the export name prefixed with `DS_`, so Jigsaw components stand out in React DevTools. A sub-component uses its dotted name, such as `DS_Card.Header`.

  ```tsx
  export function Button({ ref, className, ...props }: ButtonProps) {
    return <ReactAriaButton {...props} className={className} ref={ref} />;
  }

  Button.displayName = "DS_Button";
  ```

- `src/components/ref.test.tsx` renders every export with a ref, and checks that the ref reaches the element carrying the component's class and that each export has a `DS_` display name. Components that render no element of their own, such as `ThemeProvider` and `TooltipTrigger`, are listed there as exceptions.

## The public API

Jigsaw gets its behaviour and accessibility from [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html), but React Aria is an internal detail: apps use Jigsaw's own API, and none of React Aria's props or types are part of it. The base library could then change without breaking apps.

**Today's components don't follow this yet.** They pass React Aria's props through, such as Button's `isDisabled` and `onPress`. JSW-126 moves them over. Until then, new components and new props follow the rules below, and existing ones keep their current API until their migration.

- Use HTML names, so apps use the props they already know: `disabled`, `type`, `onClick` and `aria-label`.
- Only include the HTML attributes that reach the element. React Aria passes an allowlist of attributes to the DOM and silently drops the rest, such as `title`, `tabIndex` and most `aria-*` attributes. Pick the ones that work from React's props for the element, such as `ComponentPropsWithoutRef<"button">`, and test that each one reaches the element.
- Add Jigsaw names only where HTML has none, such as `loading`, and comment each one.
- Make every prop optional and independent, so an app can spread its own props onto a component, as onto a native element. Don't use types that reject combinations, such as a union with `?: never`. Where a component can't work without something, such as an accessible name, warn in development with Jigsaw's own warning, such as `useAccessibleNameWarning` from `@hooks`, so every component warns the same way.
- Check that each HTML prop behaves as it does on the native element, and handle any difference inside the component.
- Don't expose React Aria's render props, such as a function `className`. Components take `className` as a string, plus `classNameOverrides`.
- Import React Aria components with a `ReactAria` prefix, such as `Button as ReactAriaButton`, and map Jigsaw's props onto React Aria's names inside the component.

## Styling components

Components are styled with Tailwind classes and the Jigsaw theme. `button/Button.styles.ts` is the reference example.

- Put the styles in the styles file as a named export, such as `buttonStyles`: an object with one [CVA](https://cva.style) call per part, `component` for the outer element and a name for each part inside it, such as `text` or `media`.
- Use variants for the design choices a component offers, such as `variant` and `size`. Take each variant prop's type from the styles with CVA's `VariantProps`, so a new variant is added in one place:

  ```ts
  export type ButtonSize = NonNullable<
    VariantProps<typeof buttonStyles.component>["size"]
  >;
  ```

- In the component, get each part's classes with `useGetClassNames`, which runs each part's CVA call and merges in `classNameOverrides`. Then merge the app's `className` into the outer element's with `useRootClassName`.
- Components take two props for an app's classes: `className`, a string, for the outer element, and `classNameOverrides`, keyed by part, typed with `ClassNameOverrides<typeof buttonStyles>`. Where they set the same thing, the override wins.
- Prefer a prop for a design choice, such as `tone="secondary"`, over documenting a class an app should add.
- Size components with padding rather than fixed heights, so long content can wrap. Don't use `@apply`.
- `Text` and `Heading` are presentational: put layout on a wrapper element, not on them.

## Sub-components

A component made of parts uses dot notation, such as `Card.Header`, `Form.Group` and `RadioGroup.Item`.

- Each part lives in its own file in the parent's folder. Card, Select and RadioGroup use files prefixed with the parent's name, such as `CardHeader.tsx`, while Form, Tabs and Toast keep their parts in a `sub-components/` folder. There's no single rule yet, so follow the folder you're working in.
- Each part follows the declaration rules above, with a dotted display name, such as `DS_Card.Header`.
- The parent attaches each part as a property, such as `Card.Header = CardHeader`.
- The folder's `index.ts` also exports each part by name, such as `CardHeader`, with its props type. A React Server Component can't reach a part through dot notation on a client component's import, so the named export is the only way to use it there. `src/components/sub-component-exports.test.ts` fails when an attached part isn't exported by name.

## Writing tests

Tests use Vitest and Testing Library. Globals are off: import `describe`, `it`, `expect` and `vi` from `vitest`.

- Name each test so it reads as a sentence after "it", describing the behaviour: `it("calls onPress when Enter is pressed", ...)`. Group tests in a `describe` named after the component.
- Test what a user sees and does, not internal state, class names or markup structure. Query elements the way assistive technology finds them: `getByRole` with a `name` first, then `getByLabelText`, then `getByText`. Use `getByTestId` only when there's no accessible way, and say why.
- Simulate interactions with `userEvent`, not `fireEvent`.
- A test fails if it logs a warning or an error it didn't expect, from `src/test-setup.ts`. A test of a development warning mocks it with `vi.spyOn(console, "warn").mockImplementation(() => {})` and checks it was called.
- These shared tests cover every component, so a new component needs an entry in each:
  - `src/components/a11y.test.tsx` runs axe on every component in each state that changes the markup, such as disabled, invalid or expanded. Rule exceptions live in `src/test-utils/axe.ts`, each with its reason. Colour contrast is off in jsdom, and the story tests check it in Chromium.
  - `src/components/announcements.test.tsx` pins what a screen reader announces for each state, such as `"checkbox, Accept terms, checked"`, using `src/test-utils/announce.ts`. Changing an expectation changes what assistive technology users hear, so do it only on purpose.
  - `src/components/accessible-name-warning.test.tsx` checks that each control warns when it has no accessible name.
  - `src/components/ref.test.tsx`. See Declaring a component.

## Writing stories

Storybook lives in `apps/storybook`, and finds every `*.stories.tsx` in `packages/design-system/src/components/`.

- Declare `meta` with `satisfies Meta<typeof Button>` and type stories as `StoryObj<typeof meta>`. Use `fn()` from `storybook/test` for callback props, so calls show in the Actions panel.
- Add a story for each meaningful state, such as disabled, error or long content. Describe when to use the component in `parameters.docs.description.component`.
- Every story is checked with axe in Chromium, and a violation fails the story tests. Fix it rather than switching the check off. If a story has to accept a violation for now, set `parameters: { a11y: { test: "todo" } }` with a comment linking the JSW ticket that fixes it.
- `apps/storybook/.storybook/story-rules.test.mjs` checks every story file:
  - **Show code must be copy-pasteable.** If a story's `render` uses a local helper, set `parameters.docs.source.code` to the real Jigsaw usage. Prefer rendering the component directly, such as uncontrolled with `defaultSelected`. Documentation pages with no snippet to copy set `parameters.docs.codePanel: false` instead.
  - **No layout classes on `Text` or `Heading`**, such as `flex`, `gap-*` or `items-*`.

### Keyboard play functions

Each interactive component has a `play` function that uses only the keyboard: Tab to the control, use its keys, and check where focus goes and what happens. Use the `canvas`, `userEvent` and `step` the `play` function receives, and wrap each check in a `step`, so the Interactions panel reads as a list of behaviours:

```tsx
export const Disabled: Story = {
  args: { isDisabled: true, children: "Disabled button" },
  play: async ({ canvas, userEvent, step }) => {
    await step("Tab skips the disabled button", async () => {
      await userEvent.tab();
      await expect(
        canvas.getByRole("button", { name: "Disabled button" }),
      ).not.toHaveFocus();
    });
  },
};
```

Storybook runs a story's `play` function every time the story opens, so decide where each one goes:

- **On the story people browse,** when the steps leave it looking as it started, such as pressing Space twice on a checkbox, or opening a list and closing it with Escape. End with `clearFocus()` from `src/test-utils/story-play.ts`, so the story and its Chromatic snapshot don't open with a focus ring.
- **On a hidden test story,** when the steps leave a visible result, such as choosing an option, typing or submitting a form. Give it `tags: ["!dev", "!autodocs"]`, written out in the story because Storybook reads tags statically, and `parameters: TEST_ONLY_PARAMETERS`. It's hidden from the sidebar and Docs page, and Chromatic skips it, but the story tests still run it.

Pitfalls:

- Popovers, tooltips, listboxes, dialogs and toasts render outside the story canvas, so query them with `screen` from `storybook/test`.
- Following a link navigates the test page away from the story, so prevent its `click` default in the play function.
- React Aria collections, such as `Tabs` and `Select`'s options, render their items after the first pass, and in Storybook's production build, which Chromatic uses, the play function can start before them. Use `findByRole` for the first query.
- Focus returns to an overlay's trigger after its exit transition, so wait for it: `await waitFor(() => expect(trigger).toHaveFocus())`.

## Accessibility checklist

Components must meet WCAG 2.2 AA. React Aria provides the keyboard, focus and ARIA behaviour, and the checks below test it on every pull request.

**Automated today**

- axe on every component in each state that changes the markup, in jsdom, and on every story in Chromium, including colour contrast.
- What a screen reader announces for each state.
- A development warning, with a test, for each control without an accessible name.
- Keyboard `play` functions on the stories.

**Planned (JSW-125)**, run after every story so every component gets them without a test of its own:

- Visible controls are at least 24 by 24 CSS pixels (JSW-140).
- Tabbing shows a focus outline that isn't covered, including in Windows High Contrast mode (JSW-141).
- Nothing is wider than the page at 320 CSS pixels (JSW-142).
- No text spills or is cut off with WCAG's increased text spacing (JSW-143).
- Controls keep a border in forced colours, and no animation keeps looping with reduced motion (JSW-144).
- Parts look the same without Tailwind's Preflight (JSW-145).

**By hand, before merging**

- The focus indicator has a contrast of at least 3:1 with what's behind it, including on dark backgrounds.
- Colour isn't the only way information is shown, such as an error state.
- The component works at 200% zoom.

**What to build to**

- Use the native element where there is one, or the React Aria component. Add ARIA roles only when nothing fits.
- Every interactive element has an accessible name that includes its visible label (2.5.3), and exposes its states, such as `aria-expanded`, `aria-checked` and `aria-invalid`.
- Components don't hard-code a heading level a page might need to change. `Form.Group`'s `titleAs` is the example.
- Everything works with the keyboard alone, in a logical Tab order, with no keyboard trap, and keys follow the [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/) for the pattern. Overlays move focus in when they open and return it when they close.
- Text contrast is at least 4.5:1, or 3:1 for large text. Icons, control borders and focus indicators are at least 3:1.
- Fields have visible labels linked to the input, help and error text is linked with `aria-describedby`, and errors are described in text.
- Animation respects `prefers-reduced-motion`.

## Pull requests

- One pull request per JSW ticket, on a `feat/jsw-<n>-<short-description>` branch.
- Title it with the ticket and what it does: `JSW-129: Cover keyboard behaviour in story play functions`.
- Fill in `.github/pull_request_template.md`: the ticket link, **Changes**, **Testing** and **Consumer changelog**. Under Testing, record only what was actually run, with the number of tests, that each new check fails when it should, and anything checked by hand. Say if a check was skipped.
- A review bot comments on each pull request. Fix or reply to every comment.
