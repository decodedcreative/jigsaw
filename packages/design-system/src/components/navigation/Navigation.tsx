"use client";

import { ListIcon } from "@phosphor-icons/react/List";
import { XIcon } from "@phosphor-icons/react/X";
import { type ReactNode, type HTMLAttributes } from "react";
import {
  Button as ReactAriaButton,
  Dialog as ReactAriaDialog,
  Link as ReactAriaLink,
  Modal as ReactAriaModal,
  ModalOverlay as ReactAriaModalOverlay,
} from "react-aria-components";
import { usePartProps, useRootClassName, useAccessibleNameWarning } from "@hooks";
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
import type { ClassNameOverrides, WithoutClassName, RefProp } from "@jsw-types/component-props";

/** Root `className`, merged last via `twMerge` (wins conflicts). */
type RootClassNameProp = {
  className?: string;
};

export type NavigationProps = RefProp<HTMLElement> & WithoutClassName<HTMLAttributes<HTMLElement>> &
  RootClassNameProp & {
    classNameOverrides?: ClassNameOverrides<typeof navigationStyles>;
  };

export const Navigation = ({ classNameOverrides, className, children, ...props }: NavigationProps) => {
  const parts = usePartProps("navigation", navigationStyles, classNameOverrides, {
    component: {},
    container: {},
  });
  const rootClassName = useRootClassName(parts.component.className, className);

  return (
    <nav {...props} {...parts.component} className={rootClassName}>
      <div {...parts.container}>{children}</div>
    </nav>
  );
};

Navigation.displayName = "DS_Navigation";

export type NavigationInnerProps = RefProp<HTMLDivElement> & WithoutClassName<HTMLAttributes<HTMLDivElement>> &
  RootClassNameProp & {
    classNameOverrides?: ClassNameOverrides<typeof navigationInnerStyles>;
  };

export const NavigationInner = ({ classNameOverrides, className, children, ...props }: NavigationInnerProps) => {
  const parts = usePartProps("navigation-inner", navigationInnerStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(parts.component.className, className);
  return (
    <div {...props} {...parts.component} className={rootClassName}>
      {children}
    </div>
  );
};

NavigationInner.displayName = "DS_NavigationInner";

export type NavigationBrandProps = RefProp<HTMLAnchorElement> & RootClassNameProp & {
  href?: string;
  children?: ReactNode;
  classNameOverrides?: ClassNameOverrides<typeof navigationBrandStyles>;
};

export const NavigationBrand = ({
  href = "/",
  classNameOverrides,
  className,
  children,
  ref,
}: NavigationBrandProps) => {
  const nameRef = useAccessibleNameWarning("NavigationBrand", ref);
  const parts = usePartProps("navigation-brand", navigationBrandStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(parts.component.className, className);
  return (
    <ReactAriaLink ref={nameRef} href={href} {...parts.component} className={rootClassName}>
      {children}
    </ReactAriaLink>
  );
};

NavigationBrand.displayName = "DS_NavigationBrand";

export type NavigationLinksProps = RefProp<HTMLDivElement> & WithoutClassName<HTMLAttributes<HTMLDivElement>> &
  RootClassNameProp & {
    classNameOverrides?: ClassNameOverrides<typeof navigationLinksStyles>;
  };

export const NavigationLinks = ({ classNameOverrides, className, children, ...props }: NavigationLinksProps) => {
  const parts = usePartProps("navigation-links", navigationLinksStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(parts.component.className, className);
  return (
    <div {...props} {...parts.component} className={rootClassName}>
      {children}
    </div>
  );
};

NavigationLinks.displayName = "DS_NavigationLinks";

export type NavigationLinkProps = RefProp<HTMLAnchorElement> & RootClassNameProp & {
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
  ref,
}: NavigationLinkProps) => {
  const nameRef = useAccessibleNameWarning("NavigationLink", ref);
  const parts = usePartProps("navigation-link", navigationLinkStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(parts.component.className, className);
  return (
    <ReactAriaLink
      ref={nameRef}
      href={href}
      {...parts.component}
      className={rootClassName}
      data-current={isCurrent ? "" : undefined}
      aria-current={isCurrent ? "page" : undefined}
    >
      {children}
    </ReactAriaLink>
  );
};

NavigationLink.displayName = "DS_NavigationLink";

export type NavigationActionsProps = RefProp<HTMLDivElement> & WithoutClassName<HTMLAttributes<HTMLDivElement>> &
  RootClassNameProp & {
    classNameOverrides?: ClassNameOverrides<typeof navigationActionsStyles>;
  };

export const NavigationActions = ({ classNameOverrides, className, children, ...props }: NavigationActionsProps) => {
  const parts = usePartProps("navigation-actions", navigationActionsStyles, classNameOverrides, { component: {} });
  const rootClassName = useRootClassName(parts.component.className, className);
  return (
    <div {...props} {...parts.component} className={rootClassName}>
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
  const parts = usePartProps("mobile-navigation", mobileNavigationStyles, classNameOverrides, {
    mobileMenuButton: {},
    mobileMenu: {},
    mobileMenuModal: {},
    mobileMenuDialog: {},
    mobileMenuHeader: {},
    mobileMenuBody: {},
    mobileNavItem: {},
  });

  return (
    <>
      {/* Hamburger toggle — always visible on mobile */}
      <ReactAriaButton
        {...parts.mobileMenuButton}
        onPress={() => onOpenChange(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        <Icon icon={ListIcon} size="xl" />
      </ReactAriaButton>

      {/*
        Full-screen overlay on React Aria's modal primitives, so it behaves as a modal dialog:
        focus moves in and stays in, Escape closes it, focus returns to the toggle, page scroll
        is locked and the rest of the page is hidden from assistive tech (JSW-121).
      */}
      <ReactAriaModalOverlay
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable
        {...parts.mobileMenu}
      >
        <ReactAriaModal {...parts.mobileMenuModal}>
          <ReactAriaDialog aria-label="Navigation menu" {...parts.mobileMenuDialog}>
            {/* Header row mirrors the nav bar */}
            <div {...parts.mobileMenuHeader}>
              <span className="text-lg font-semibold text-foreground-primary">Menu</span>
              <ReactAriaButton
                {...parts.mobileMenuButton}
                onPress={() => onOpenChange(false)}
                aria-label="Close menu"
              >
                <Icon icon={XIcon} size="xl" />
              </ReactAriaButton>
            </div>

            {/* Nav links */}
            <nav {...parts.mobileMenuBody}>
              {links.map((link) => (
                <ReactAriaLink
                  key={link.href}
                  href={link.href}
                  {...parts.mobileNavItem}
                  data-current={link.isCurrent ? "" : undefined}
                  aria-current={link.isCurrent ? "page" : undefined}
                  onPress={() => onOpenChange(false)}
                >
                  {link.label}
                </ReactAriaLink>
              ))}
            </nav>
          </ReactAriaDialog>
        </ReactAriaModal>
      </ReactAriaModalOverlay>
    </>
  );
};

MobileNavigation.displayName = "DS_MobileNavigation";
