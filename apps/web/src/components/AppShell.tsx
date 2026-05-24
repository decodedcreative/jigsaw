"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  Navigation,
  NavigationLink,
} from "@jigsaw/design-system";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/team", label: "Team" },
  { href: "/notifications", label: "Notifications" },
  { href: "/activity", label: "Activity" },
  { href: "/settings", label: "Settings" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface-default flex flex-col">
      <Navigation
        brand={
          <NextLink href="/dashboard" className="font-heading font-bold text-xl tracking-tight text-interactive-accent hover:text-interactive-accent-hover no-underline">
            jigsaw
          </NextLink>
        }
        links={NAV_LINKS.map((l) => (
          <NavigationLink key={l.href} href={l.href} isCurrent={pathname === l.href}>
            {l.label}
          </NavigationLink>
        ))}
        actions={
          <Avatar size="sm">
            <AvatarFallback>JH</AvatarFallback>
          </Avatar>
        }
      />

      <main className="flex-1">{children}</main>
    </div>
  );
}
