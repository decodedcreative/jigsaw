"use client";

import { type ReactNode, type HTMLAttributes } from "react";
import { Link as AriaLink } from "react-aria-components";
import { useGetClassNames } from "@hooks";
import { navigationStyles } from "./Navigation.styles";

export type NavigationProps = HTMLAttributes<HTMLElement> & {
  classNameOverrides?: Record<string, string[]>;
};

export const Navigation = ({ classNameOverrides, children, ...props }: NavigationProps) => {
  const classNames = useGetClassNames(navigationStyles, classNameOverrides, {
    root: {},
    container: {},
  });

  return (
    <nav className={classNames.root} {...props}>
      <div className={classNames.container}>{children}</div>
    </nav>
  );
};

Navigation.displayName = "DS_Navigation";

export type NavigationInnerProps = HTMLAttributes<HTMLDivElement> & {
  classNameOverrides?: Record<string, string[]>;
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
  classNameOverrides?: Record<string, string[]>;
};

export const NavigationBrand = ({
  href = "/",
  classNameOverrides,
  children,
}: NavigationBrandProps) => {
  const classNames = useGetClassNames(navigationStyles, classNameOverrides, { brand: {} });
  return (
    <AriaLink href={href} className={classNames.brand}>
      {children}
    </AriaLink>
  );
};

NavigationBrand.displayName = "DS_NavigationBrand";

export type NavigationLinksProps = HTMLAttributes<HTMLDivElement> & {
  classNameOverrides?: Record<string, string[]>;
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
  classNameOverrides?: Record<string, string[]>;
};

export const NavigationLink = ({
  href,
  isCurrent,
  classNameOverrides,
  children,
}: NavigationLinkProps) => {
  const classNames = useGetClassNames(navigationStyles, classNameOverrides, { navItem: {} });
  return (
    <AriaLink
      href={href}
      className={classNames.navItem}
      data-current={isCurrent ? "" : undefined}
      aria-current={isCurrent ? "page" : undefined}
    >
      {children}
    </AriaLink>
  );
};

NavigationLink.displayName = "DS_NavigationLink";

export type NavigationActionsProps = HTMLAttributes<HTMLDivElement> & {
  classNameOverrides?: Record<string, string[]>;
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
  classNameOverrides?: Record<string, string[]>;
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
    mobileNavItem: {},
  });

  return (
    <>
      <button
        type="button"
        className={classNames.mobileMenuButton}
        onClick={() => onOpenChange(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        )}
      </button>
      {isOpen && (
        <div className={classNames.mobileMenu}>
          {links.map((link) => (
            <AriaLink
              key={link.href}
              href={link.href}
              className={classNames.mobileNavItem}
              data-current={link.isCurrent ? "" : undefined}
              aria-current={link.isCurrent ? "page" : undefined}
            >
              {link.label}
            </AriaLink>
          ))}
        </div>
      )}
    </>
  );
};

MobileNavigation.displayName = "DS_MobileNavigation";
