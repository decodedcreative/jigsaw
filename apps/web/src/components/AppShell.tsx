"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Avatar,
  MobileNavigation,
  Navigation,
  NavigationActions,
  NavigationBrand,
  NavigationInner,
  NavigationLink,
  NavigationLinks,
  ToastRegion,
} from "@jigsaw-ds/design-system";

const NAV_LINKS = [
  { href: "/dashboard",     label: "Dashboard"     },
  { href: "/team",          label: "Team"          },
  { href: "/notifications", label: "Notifications" },
  { href: "/activity",      label: "Activity"      },
  { href: "/settings",      label: "Settings"      },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-default flex flex-col">
      <Navigation>
        <NavigationInner>
          <NavigationBrand href="/dashboard">Jigsaw</NavigationBrand>

          <NavigationLinks>
            {NAV_LINKS.map((l) => (
              <NavigationLink key={l.href} href={l.href} isCurrent={pathname === l.href}>
                {l.label}
              </NavigationLink>
            ))}
          </NavigationLinks>

          <NavigationActions>
            <Avatar size="sm" initials="JH" />
            <MobileNavigation
              isOpen={mobileOpen}
              onOpenChange={setMobileOpen}
              links={NAV_LINKS.map((l) => ({ ...l, isCurrent: pathname === l.href }))}
            />
          </NavigationActions>
        </NavigationInner>
      </Navigation>

      <main className="flex-1">{children}</main>
      <ToastRegion position="bottom-right" />
    </div>
  );
}
