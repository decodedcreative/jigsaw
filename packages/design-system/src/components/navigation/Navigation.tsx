"use client";

import { type FC, useCallback, useMemo, useState } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { OverlayTriggerStateContext } from "react-aria-components";
import { Icon } from "@components/icon";
import { useGetClassNames } from "@hooks";
import { navigationStyles } from "./Navigation.styles";
import type { NavigationProps } from "./Navigation.types";

export const Navigation: FC<NavigationProps> = ({
  brand,
  links,
  actions,
  mobileOpen: mobileOpenProp,
  defaultMobileOpen = false,
  onMobileOpenChange,
  classNameOverrides,
  ...props
}: NavigationProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultMobileOpen);
  const isControlled = mobileOpenProp !== undefined;
  const mobileOpen = isControlled ? mobileOpenProp : uncontrolledOpen;

  const setMobileOpen = useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(open);
      }
      onMobileOpenChange?.(open);
    },
    [isControlled, onMobileOpenChange]
  );

  const overlayState = useMemo(
    () => ({
      isOpen: mobileOpen,
      setOpen: setMobileOpen,
      open: () => setMobileOpen(true),
      close: () => setMobileOpen(false),
      toggle: () => setMobileOpen(!mobileOpen),
    }),
    [mobileOpen, setMobileOpen]
  );

  const classNames = useGetClassNames(navigationStyles, classNameOverrides);

  const showMobileMenu = links != null;

  return (
    <nav className={classNames.component} {...props}>
      <OverlayTriggerStateContext.Provider value={overlayState}>
        <div className={classNames.container}>
          {brand}
          {showMobileMenu ? (
            <div
              className={classNames.links}
              data-open={mobileOpen ? "" : undefined}
              data-testid="navigation-links"
            >
              <div className={classNames.mobileMenuHeader}>
                <span className="text-lg font-semibold text-foreground-primary">Menu</span>
                <button
                  type="button"
                  className={classNames.menuButton}
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <Icon icon={XIcon} size="xl" />
                </button>
              </div>
              <div className={classNames.linksBody}>{links}</div>
            </div>
          ) : null}
          <div className={classNames.actions}>
            {showMobileMenu ? (
              <button
                type="button"
                className={classNames.menuButton}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label="Toggle menu"
              >
                <Icon icon={ListIcon} size="xl" />
              </button>
            ) : null}
            {actions}
          </div>
        </div>
      </OverlayTriggerStateContext.Provider>
    </nav>
  );
};

Navigation.displayName = "DS_Navigation";
