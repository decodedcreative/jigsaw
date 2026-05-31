"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
} from "@jigsaw/design-system";
import NextLink from "next/link";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 800);
  }

  return (
    <div className="min-h-screen bg-surface-default flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-interactive-accent mb-4">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground-primary">Create your account</h1>
          <p className="text-sm text-foreground-secondary mt-1">
            Already have an account?{" "}
            <NextLink href="/sign-in" className="text-interactive-accent hover:underline font-medium">
              Sign in
            </NextLink>
          </p>
        </div>

        {/* Form card */}
        <Card classNameOverrides={{ component: "shadow-lg", content: "p-8" }}>
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <Input label="First name" placeholder="James" isRequired autoComplete="given-name" />
                <Input label="Last name" placeholder="Howell" isRequired autoComplete="family-name" />
              </div>
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                isRequired
                autoComplete="email"
              />
              <Input
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                isRequired
                autoComplete="new-password"
              />
              <Checkbox isRequired>
                I agree to the{" "}
                <NextLink href="#" className="text-interactive-accent hover:underline">
                  Terms of Service
                </NextLink>{" "}
                and{" "}
                <NextLink href="#" className="text-interactive-accent hover:underline">
                  Privacy Policy
                </NextLink>
              </Checkbox>
              <Button type="submit" classNameOverrides={{ component: "w-full mt-2" }} isPending={loading}>
                {loading ? "Creating account…" : "Create account"}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
