import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Disclosure,
  Form,
  Input,
  NumberField,
  RadioGroup,
  SearchField,
  Select,
  Skeleton,
  SkeletonText,
  Tab,
  TabList,
  Tabs,
  Text,
  Textarea,
} from "@jigsaw/design-system";
import { Preview } from "./Preview";
import type { PreviewMap } from "../Introduction.stories.types";

export const previews: PreviewMap = {
  Avatar: (
    <Preview>
      <Avatar size="md" initials="JH" />
      <Avatar size="sm" initials="AB" />
      <Avatar size="xs" initials="CD" />
    </Preview>
  ),

  Badge: (
    <Preview>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
    </Preview>
  ),

  Button: (
    <Preview>
      <Button size="sm">Primary</Button>
      <Button variant="secondary" size="sm">Secondary</Button>
    </Preview>
  ),

  Card: (
    <Preview>
      <div className="scale-75 origin-center">
        <Card title="Card title">
          <p className="text-sm text-foreground-secondary">A short description.</p>
        </Card>
      </div>
    </Preview>
  ),

  Checkbox: (
    <Preview>
      <div className="flex flex-col gap-1.5">
        <Checkbox defaultSelected>Checked</Checkbox>
        <Checkbox>Unchecked</Checkbox>
      </div>
    </Preview>
  ),

  CheckboxGroup: (
    <Preview>
      <div className="flex flex-col gap-1.5">
        <Checkbox defaultSelected>Option A</Checkbox>
        <Checkbox defaultSelected>Option B</Checkbox>
        <Checkbox>Option C</Checkbox>
      </div>
    </Preview>
  ),

  Disclosure: (
    <Preview>
      <div className="w-40">
        <Disclosure defaultExpanded title="FAQ item">
          <p className="text-[10px] text-foreground-secondary">Answer content goes here.</p>
        </Disclosure>
      </div>
    </Preview>
  ),

  Form: (
    <Preview>
      <div className="w-40 scale-90">
        <Form>
          <Input label="Email" placeholder="you@example.com" />
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default">
            <Button size="sm" type="submit">Save</Button>
          </div>
        </Form>
      </div>
    </Preview>
  ),

  Input: (
    <Preview>
      <div className="w-36 scale-90">
        <Input label="Email" placeholder="you@example.com" />
      </div>
    </Preview>
  ),

  Link: (
    <Preview>
      <span className="text-sm font-medium text-interactive-primary underline underline-offset-2">
        Learn more →
      </span>
    </Preview>
  ),

  Modal: (
    <Preview>
      <div className="w-36 border border-border-default rounded-lg bg-surface-default shadow-lg p-3">
        <p className="text-[10px] font-semibold text-foreground-primary mb-1">Dialog title</p>
        <p className="text-[9px] text-foreground-secondary leading-tight mb-2">Are you sure you want to continue?</p>
        <div className="flex gap-1 justify-end">
          <div className="h-4 w-10 rounded bg-border-default" />
          <div className="h-4 w-10 rounded bg-interactive-accent" />
        </div>
      </div>
    </Preview>
  ),

  Navigation: (
    <Preview>
      <div className="w-40 h-7 bg-navy-900 rounded-md flex items-center justify-between px-2">
        <span className="text-[9px] font-bold text-white">Jigsaw</span>
        <div className="flex gap-2">
          <div className="h-1.5 w-6 rounded-full bg-white/40" />
          <div className="h-1.5 w-6 rounded-full bg-white/40" />
          <div className="h-1.5 w-6 rounded-full bg-orange-400" />
        </div>
      </div>
    </Preview>
  ),

  NumberField: (
    <Preview>
      <div className="w-28 scale-90">
        <NumberField label="Qty" defaultValue={3} />
      </div>
    </Preview>
  ),

  RadioGroup: (
    <Preview>
      <RadioGroup label="Plan" defaultValue="pro">
        <RadioGroup.Item value="free">Free</RadioGroup.Item>
        <RadioGroup.Item value="pro">Pro</RadioGroup.Item>
      </RadioGroup>
    </Preview>
  ),

  SearchField: (
    <Preview>
      <div className="w-36 scale-90">
        <SearchField label="Search" placeholder="Search…" />
      </div>
    </Preview>
  ),

  Select: (
    <Preview>
      <div className="w-32 scale-90">
        <Select label="Role" placeholder="Pick one">
          <Select.Item id="admin">Admin</Select.Item>
          <Select.Item id="editor">Editor</Select.Item>
        </Select>
      </div>
    </Preview>
  ),

  Skeleton: (
    <Preview>
      <div className="flex flex-col gap-1.5 w-32">
        <Skeleton height={10} width="100%" />
        <SkeletonText width="80%" />
        <SkeletonText width="60%" />
      </div>
    </Preview>
  ),

  Tabs: (
    <Preview>
      <div className="w-40">
        <Tabs>
          <TabList>
            <Tab id="a">Overview</Tab>
            <Tab id="b">Details</Tab>
          </TabList>
        </Tabs>
      </div>
    </Preview>
  ),

  Text: (
    <Preview>
      <div className="flex flex-col items-start gap-0.5">
        <Text size="base" weight="semibold">Heading</Text>
        <Text size="sm" classNameOverrides={{ component: "text-foreground-secondary" }}>
          Body text
        </Text>
        <Text size="xs" muted>Caption</Text>
      </div>
    </Preview>
  ),

  Textarea: (
    <Preview>
      <div className="w-36 scale-90">
        <Textarea label="Notes" placeholder="Write something…" rows={2} />
      </div>
    </Preview>
  ),

  Toast: (
    <Preview>
      <div className="flex flex-col gap-1.5 w-36">
        <div className="flex items-start gap-1.5 bg-state-success-bg border border-state-success-border rounded-md p-2">
          <div className="w-2 h-2 mt-0.5 rounded-full bg-state-success shrink-0" />
          <div>
            <p className="text-[9px] font-semibold text-foreground-primary">Saved!</p>
            <p className="text-[8px] text-foreground-secondary">Your changes were saved.</p>
          </div>
        </div>
        <div className="flex items-start gap-1.5 bg-state-error-bg border border-state-error-border rounded-md p-2">
          <div className="w-2 h-2 mt-0.5 rounded-full bg-state-error shrink-0" />
          <div>
            <p className="text-[9px] font-semibold text-foreground-primary">Error</p>
            <p className="text-[8px] text-foreground-secondary">Something went wrong.</p>
          </div>
        </div>
      </div>
    </Preview>
  ),

  Tooltip: (
    <Preview>
      <Button size="sm" variant="secondary">Hover me</Button>
    </Preview>
  ),
};
