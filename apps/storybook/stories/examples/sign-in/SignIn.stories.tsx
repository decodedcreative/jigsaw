import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Link,
  Text,
} from "@jigsaw/design-system";
import {
  BrandMark,
  GitHubIcon,
  GoogleIcon,
  SuccessCheck,
} from "./components";

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const SignInPage = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface-default flex items-center justify-center p-6">
        <Card classNameOverrides={{ component: "w-full max-w-sm shadow-lg", content: "p-8 text-center" }}>
          <SuccessCheck />
          <Text size="lg" weight="semibold" className="mb-2">Signed in!</Text>
          <Text size="sm" className="text-text-secondary mb-6">Welcome back to Jigsaw.</Text>
          <Button variant="secondary" onPress={() => setSubmitted(false)}>Sign out</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-default flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <BrandMark />
          <h1 className="text-2xl font-bold text-text-primary">Sign in to Jigsaw</h1>
          <Text size="sm" className="text-text-secondary mt-1">
            Don't have an account?{" "}
            <Link href="#">Sign up free</Link>
          </Text>
        </div>

        {/* Card */}
        <Card classNameOverrides={{ component: "shadow-lg", content: "p-8" }}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="flex flex-col gap-4">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                isRequired
                autoComplete="email"
              />
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  isRequired
                  autoComplete="current-password"
                />
                <div className="mt-1 text-right">
                  <Link href="#" className="text-xs">Forgot password?</Link>
                </div>
              </div>
              <Checkbox>Remember me for 30 days</Checkbox>
              <Button type="submit" classNameOverrides={{ component: "w-full mt-2" }}>Sign in</Button>
            </div>
          </Form>
        </Card>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border-subtle" />
          <Text size="xs" muted>or continue with</Text>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>

        {/* OAuth buttons */}
        <div className="flex flex-col gap-3">
          <Button variant="secondary" classNameOverrides={{ component: "w-full gap-2" }}>
            <GoogleIcon />
            Continue with Google
          </Button>
          <Button variant="secondary" classNameOverrides={{ component: "w-full gap-2" }}>
            <GitHubIcon />
            Continue with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: "Examples/Sign In",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SignInPage />,
};
