"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Link,
} from "@jigsaw/design-system";
import NextLink from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { GitHubIcon } from "@/components/oauth/GitHubIcon";
import { GoogleIcon } from "@/components/oauth/GoogleIcon";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate async sign-in then redirect
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
          <h1 className="text-2xl font-bold text-foreground-primary">Sign in to Jigsaw</h1>
          <p className="text-sm text-foreground-secondary mt-1">
            Don't have an account?{" "}
            <NextLink href="/sign-up" className="text-interactive-accent hover:underline font-medium">
              Sign up free
            </NextLink>
          </p>
        </div>

        {/* Form card */}
        <Card classNameOverrides={{ component: "shadow-lg", content: "p-8" }}>
          <Form onSubmit={handleSubmit}>
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
                  <Link href="#">Forgot password?</Link>
                </div>
              </div>
              <Checkbox>Remember me for 30 days</Checkbox>
              <Button type="submit" classNameOverrides={{ component: "w-full mt-2" }} isPending={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </div>
          </Form>
        </Card>

        {/* OAuth */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border-subtle" />
          <span className="text-xs text-foreground-muted">or continue with</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>
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
}
