"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
} from "@jigsaw-ds/design-system";
import NextLink from "next/link";
import { BrandMark } from "@/components/BrandMark";

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
          <div className="mb-4">
            <BrandMark />
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
