import type { Meta, StoryObj } from "@storybook/react";
import { getClassNames } from "@utils";
import { Form } from "./index";
import { Input } from "../input/Input";
import { Textarea } from "../textarea/Textarea";
import { Select } from "../select/Select";
import { NumberField } from "../number-field/NumberField";
import { SearchField } from "../search-field/SearchField";
import { Checkbox } from "../checkbox";
import { CheckboxGroup } from "../checkbox-group";
import { RadioGroup } from "../radio-group";
import { Button } from "../button/Button";
import { formStoryStyles } from "./Form.stories.styles";

const meta = {
  title: "Design System/Form",
  component: Form,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "`Form` wraps React Aria's form primitive for submission and validation.",
          "",
          'Set `labelPosition="side"` on `Form` to place field labels in a fixed left column (right-aligned) beside their controls for `Input`, `Textarea`, `Select`, `NumberField`, `SearchField`, `CheckboxGroup`, and `RadioGroup`.',
          "",
          "**Action rows** — place Cancel/Submit buttons in a plain layout `div` at the end of the form. There is no `FormActions` wrapper component. Use flex + gap + top border utilities, or `formStoryStyles.footer` in stories (includes side-label alignment when needed).",
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * - **Form.Group** — titled section for stacking related fields (layout only).
 * - **CheckboxGroup / RadioGroup** — use their own `label` when the section is a single field group; skip Form.Group.
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Stack fields in `Form.Group` sections, then add a plain `div` action row with Cancel and Submit buttons — see `formStoryStyles.footer` for the recommended layout classes.",
      },
    },
  },
  render: () => {
    const classNames = getClassNames(formStoryStyles, {}, { canvas: { width: "default" } });

    return (
      <div className={classNames.canvas}>
        <Form>
          <Form.Group title="Account details">
            <Input label="Name" />
            <Input label="Email" type="email" />
          </Form.Group>
          <div className={classNames.footer}>
            <Button variant="secondary">Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </div>
    );
  },
};

export const SideLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Form-level `labelPosition="side"` places labels in a fixed left column (right-aligned) beside controls. `Form.Group` titles align with the control column. Fields still own their labels via the `label` prop.',
      },
    },
  },
  render: () => {
    const classNames = getClassNames(formStoryStyles, {}, { canvas: { width: "wide" } });

    return (
      <div className={classNames.canvas}>
        <Form labelPosition="side">
          <Form.Group title="Account details">
            <Input label="Name" defaultValue="James Howell" />
            <Input label="Email" type="email" defaultValue="james@example.com" />
            <Input label="Phone" type="tel" description="Optional. Include country code." />
            <Textarea
              label="Bio"
              description="A short summary shown on your profile."
              defaultValue="Product designer based in London."
            />
            <Input
              label="Username"
              defaultValue="j"
              errorMessage="Username must be at least 3 characters."
            />
            <Select label="Role" defaultValue="editor">
              <Select.Item id="viewer">Viewer</Select.Item>
              <Select.Item id="editor">Editor</Select.Item>
              <Select.Item id="admin">Admin</Select.Item>
            </Select>
            <NumberField
              label="Team size"
              description="Including yourself."
              defaultValue={4}
              minValue={1}
            />
            <SearchField
              label="Find colleague"
              description="Search by name or email."
              placeholder="Search people…"
            />
          </Form.Group>
          <Form.Group title="Preferences">
            <CheckboxGroup
              label="Notifications"
              description="Choose which updates you receive."
              defaultValue={["product", "security"]}
            >
              <Checkbox value="product" label="Product updates" />
              <Checkbox value="security" label="Security alerts" />
              <Checkbox value="marketing" label="Marketing emails" />
            </CheckboxGroup>
            <RadioGroup
              label="Theme"
              description="Applies across all devices."
              defaultValue="system"
            >
              <RadioGroup.Item value="light" label="Light" />
              <RadioGroup.Item value="dark" label="Dark" />
              <RadioGroup.Item value="system" label="System" />
            </RadioGroup>
          </Form.Group>
          <div className={classNames.footer}>
            <Button variant="secondary">Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </div>
    );
  },
};
