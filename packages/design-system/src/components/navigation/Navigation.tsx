"use client";

import { type ReactNode, type HTMLAttributes } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { Link as ReactAriaLink } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { Icon } from "@components/icon";
import { navigationStyles } from "./Navigation.styles";
import type { ClassNameOverrides } from "@jsw-types/component-props";

export type NavigationProps = HTMLAttributes<HTMLElement> & {
  classNameOverrides?: ClassNameOverrides<typeof navigationStyles>;
};

export const Navigation = ({ classNameOverrides, children, ...props }: NavigationProps) => {
  const classNames = useGetClassNames(navigationStyles, classNameOverrides, {
    component: {},
    container: {},
  });

  return (
    <nav className={classNames.component} {...props}>
      <div className={classNames.container}>{children}</div>
    </nav>
  );
};

Navigation.displayName = "DS_Navigation";

export type NavigationInnerProps = HTMLAttributes<HTMLDivElement> & {
  classNameOverrides?: ClassNameOverrides<typeof navigationStyles>;
};

export const NavigationInner = ({ classNameOverrides, children, ...props }: NavigationInnerProps) => {
  const classNames = useGetClassNames(navigationStyles, classNameOverrides, { inner: {} });
  return (
    <div className={classNames.inner} {...props}>
      {children}
    </div>
  );
};

NavigationInner.displayName = "DS_NavigationInner";

export type NavigationBrandProps = {
  href?: string;
  children?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof navigationStyles>;
};

export const NavigationBrand = ({
  href = "/",
  classNameOverrides,
  children,
}: NavigationBrandProps) => {
  const classNames = useGetClassNames(navigationStyles, classNameOverrides, { brand: {} });
  return (
    <ReactAriaLink href={href} className={classNames.brand}>
      {children}
    </ReactAriaLink>
  );
};

NavigationBrand.displayName = "DS_NavigationBrand";

export type NavigationLinksProps = HTMLAttributes<HTMLDivElement> & {
  classNameOverrides?: ClassNameOverrides<typeof navigationStyles>;
};

export const NavigationLinks = ({ classNameOverrides, children, ...props }: NavigationLinksProps) => {
  const classNames = useGetClassNames(navigationStyles, classNameOverrides, { nav: {} });
  return (
    <div className={classNames.nav} {...props}>
      {children}
    </div>
  );
};

NavigationLinks.displayName = "DS_NavigationLinks";

export type NavigationLinkProps = {
  href: string;
  isCurrent?: boolean;
  children: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof navigationStyles>;
};

export const NavigationLink = ({
  href,
  isCurrent,
  classNameOverrides,
  children,
}: NavigationLinkProps) => {
  const classNames = useGetClassNames(navigationStyles, classNameOverrides, { navItem: {} });
  return (
    <ReactAriaLink
      href={href}
      className={classNames.navItem}
      data-current={isCurrent ? "" : undefined}
      aria-current={isCurrent ? "page" : undefined}
    >
      {children}
    </ReactAriaLink>
  );
};

NavigationLink.displayName = "DS_NavigationLink";

export type NavigationActionsProps = HTMLAttributes<HTMLDivElement> & {
  classNameOverrides?: ClassNameOverrides<typeof navigationStyles>;
};

export const NavigationActions = ({ classNameOverrides, children, ...props }: NavigationActionsProps) => {
  const classNames = useGetClassNames(navigationStyles, classNameOverrides, { actions: {} });
  return (
    <div className={classNames.actions} {...props}>
      {children}
    </div>
  );
};

NavigationActions.displayName = "DS_NavigationActions";

export type MobileNavigationProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  links: Array<{ href: string; label: string; isCurrent?: boolean }>;
  classNameOverrides?: ClassNameOverrides<typeof navigationStyles>;
};

export const MobileNavigation = ({
  isOpen,
  onOpenChange,
  links,
  classNameOverrides,
}: MobileNavigationProps) => {
  const classNames = useGetClassNames(navigationStyles, classNameOverrides, {
    mobileMenuButton: {},
    mobileMenu: {},
    mobileMenuHeader: {},
    mobileMenuBody: {},
    mobileNavItem: {},
  });

  return (
    <>
      {/* Hamburger toggle — always visible on mobile */}
      <button
        type="button"
        className={classNames.mobileMenuButton}
        onClick={() => onOpenChange(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <Icon icon={ListIcon} size="xl" />
      </button>

      {/* Full-screen overlay */}
      {isOpen && (
        <div className={classNames.mobileMenu} role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* Header row mirrors the nav bar */}
          <div className={classNames.mobileMenuHeader}>
            <span className="text-lg font-semibold text-foreground-primary">Menu</span>
            <button
              type="button"
              className={classNames.mobileMenuButton}
              onClick={() => onOpenChange(false)}
              aria-label="Close menu"
            >
              <Icon icon={XIcon} size="xl" />
            </button>
          </div>

          {/* Nav links */}
          <nav className={classNames.mobileMenuBody}>
            {links.map((link) => (
              <ReactAriaLink
                key={link.href}
                href={link.href}
                className={classNames.mobileNavItem}
                data-current={link.isCurrent ? "" : undefined}
                aria-current={link.isCurrent ? "page" : undefined}
                onPress={() => onOpenChange(false)}
              >
                {link.label}
              </ReactAriaLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

MobileNavigation.displayName = "DS_MobileNavigation";
