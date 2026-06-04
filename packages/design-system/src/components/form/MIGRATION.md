# Form package migration (JSW-17)

## Renames

| Before | After |
|--------|-------|
| `FormFieldset` | `Form.Group` (was standalone `FormGroup`) |
| `legend` / section `label` | `title` |
| `FormActions` | App-layer footer (`div` + Tailwind) |

## Usage

- **`Form.Group`** — layout section with optional `title` (Heading). Stack related fields; do not wrap avatars and inputs in one group when they serve different purposes.
- **`CheckboxGroup` / `RadioGroup`** — use built-in `label` for a single field group; omit `Form.Group` when one group field owns the section name.

```tsx
import { Form } from "@jigsaw/design-system";

<Form>
  <Form.Group title="Account details">...</Form.Group>
</Form>
```
- **Field labels** — remain on `Input`, `Select`, `Textarea`, etc. (React Aria pattern; no `FormItem`).

## Example footer (app layer)

```tsx
<div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default">
  <Button variant="secondary">Cancel</Button>
  <Button type="submit">Save</Button>
</div>
```

See Account Settings storybook `FormFooter` for a shared example helper.
