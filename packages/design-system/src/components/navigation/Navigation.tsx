"use client";

import { ListIcon } from "@phosphor-icons/react/List";
import { XIcon } from "@phosphor-icons/react/X";
import { type ReactNode, type HTMLAttributes } from "react";
import { Link as ReactAriaLink } from "react-aria-components";
import { useGetClassNames, useRootClassName } from "@hooks";
import { Icon } from "@components/icon";
import {
  mobileNavigationStyles,
  navigationActionsStyles,
  navigationBrandStyles,
  navigationInnerStyles,
  navigationLinkStyles,
  navigationLinksStyles,
  navigationStyles,
} from "./Navigation.styles";
import type { ClassNameOverrides, WithoutClassName } from "@jsw-types/component-props";

/** Root `className`, merged last via `twMerge` (wins conflicts). */
type RootClassNameProp = {
  className?: string;
};

export type NavigationProps = WithoutClassName<HTMLAttributes<HTMLElement>> &
  RootClassNameProp & {
    classNameOverrides?: ClassNameOverrides<typeof navigationStyles>;
  };

export const Navigation = ({ classNameOverrides, className, children, ...props }: NavigationProps) => {
  const classNames = useGetClassNames(navigationStyles, classNameOverrides, {
    component: {},
    container: {},
  });
  const rootClassName = useRootClassName(classNames.component, className);

  return (
    <nav {...props} className={rootClassName}>
      <div className={classNames.container}>{children}</div>
    </nav>
  );
};

Navigation.displayName = "DS_Navigation";

export type NavigationInnerProps = WithoutClassName<HTMLAttributes<HTMLDivElement>> &
  RootClassNameProp & {
    classNameOverrides?: ClassNameOverrides<typeof navigationInnerStyles>;
  };

export const NavigationInner = ({ classNameOverrides, className, children, ...props }: NavigationInnerProps) => {
  const classNames = useGetClassNames(navigationInnerStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(classNames.component, className);
  return (
    <div {...props} className={rootClassName}>
      {children}
    </div>
  );
};

NavigationInner.displayName = "DS_NavigationInner";

export type NavigationBrandProps = RootClassNameProp & {
  href?: string;
  children?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof navigationBrandStyles>;
};

export const NavigationBrand = ({
  href = "/",
  classNameOverrides,
  className,
  children,
}: NavigationBrandProps) => {
  const classNames = useGetClassNames(navigationBrandStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(classNames.component, className);
  return (
    <ReactAriaLink href={href} className={rootClassName}>
      {children}
    </ReactAriaLink>
  );
};

NavigationBrand.displayName = "DS_NavigationBrand";

export type NavigationLinksProps = WithoutClassName<HTMLAttributes<HTMLDivElement>> &
  RootClassNameProp & {
    classNameOverrides?: ClassNameOverrides<typeof navigationLinksStyles>;
  };

export const NavigationLinks = ({ classNameOverrides, className, children, ...props }: NavigationLinksProps) => {
  const classNames = useGetClassNames(navigationLinksStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(classNames.component, className);
  return (
    <div {...props} className={rootClassName}>
      {children}
    </div>
  );
};

NavigationLinks.displayName = "DS_NavigationLinks";

export type NavigationLinkProps = RootClassNameProp & {
  href: string;
  isCurrent?: boolean;
  children: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof navigationLinkStyles>;
};

export const NavigationLink = ({
  href,
  isCurrent,
  classNameOverrides,
  className,
  children,
}: NavigationLinkProps) => {
  const classNames = useGetClassNames(navigationLinkStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(classNames.component, className);
  return (
    <ReactAriaLink
      href={href}
      className={rootClassName}
      data-current={isCurrent ? "" : undefined}
      aria-current={isCurrent ? "page" : undefined}
    >
      {children}
    </ReactAriaLink>
  );
};

NavigationLink.displayName = "DS_NavigationLink";

export type NavigationActionsProps = WithoutClassName<HTMLAttributes<HTMLDivElement>> &
  RootClassNameProp & {
    classNameOverrides?: ClassNameOverrides<typeof navigationActionsStyles>;
  };

export const NavigationActions = ({ classNameOverrides, className, children, ...props }: NavigationActionsProps) => {
  const classNames = useGetClassNames(navigationActionsStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(classNames.component, className);
  return (
    <div {...props} className={rootClassName}>
      {children}
    </div>
  );
};

NavigationActions.displayName = "DS_NavigationActions";

export type MobileNavigationProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  links: Array<{ href: string; label: string; isCurrent?: boolean }>;
  /** No `className`: renders a fragment (toggle + overlay) with no single root element. */
  classNameOverrides?: ClassNameOverrides<typeof mobileNavigationStyles>;
};

export const MobileNavigation = ({
  isOpen,
  onOpenChange,
  links,
  classNameOverrides,
}: MobileNavigationProps) => {
  const classNames = useGetClassNames(mobileNavigationStyles, classNameOverrides, {
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
