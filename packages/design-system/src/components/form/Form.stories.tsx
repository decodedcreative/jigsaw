import type { Meta, StoryObj } from "@storybook/react";
import { getClassNames } from "@utils";
import { Form } from "./index";
import { Input } from "../input/Input";
import { Textarea } from "../textarea/Textarea";
import { Select, SelectItem } from "../select/Select";
import { NumberField } from "../number-field/NumberField";
import { SearchField } from "../search-field/SearchField";
import { Checkbox } from "../checkbox/Checkbox";
import { CheckboxGroup } from "../checkbox-group/CheckboxGroup";
import { Radio, RadioGroup } from "../radio-group/RadioGroup";
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
            <Select label="Role" defaultSelectedKey="editor">
              <SelectItem id="viewer">Viewer</SelectItem>
              <SelectItem id="editor">Editor</SelectItem>
              <SelectItem id="admin">Admin</SelectItem>
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
              <Radio value="light" label="Light" />
              <Radio value="dark" label="Dark" />
              <Radio value="system" label="System" />
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
