"use client";

import { XIcon } from "@phosphor-icons/react/X";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Dialog as ReactAriaDialog,
  Heading as ReactAriaHeading,
  Button as ReactAriaButton,
  Modal as ReactAriaModal,
  ModalOverlay as ReactAriaModalOverlay,
} from "react-aria-components";
import { usePartProps, useRootClassName } from "@hooks";
import type { PartProps } from "@utils";
import { Icon } from "@components/icon";
import { Button } from "../button/Button";
import { modalStyles } from "./Modal.styles";
import type { ModalProps } from "./Modal.types";

type ModalOverlayProps = Omit<ModalProps, "trigger">;

/**
 * Tracks whether an element's content overflows vertically.
 * A scrolling body with nothing focusable inside can't be scrolled from the
 * keyboard, so the content region joins the tab order only while it overflows.
 *
 * Cost: one ResizeObserver per open modal, watching the region and its direct
 * children. Content added later grows the region itself until it hits the
 * dialog's max height, which the observer sees. ResizeObserver already batches
 * to once per frame, and React skips the re-render when the boolean doesn't
 * change, so no debouncing is needed.
 */
const useIsOverflowing = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const update = () => setIsOverflowing(node.scrollHeight > node.clientHeight);
    const observer = new ResizeObserver(update);
    observer.observe(node);
    for (const child of Array.from(node.children)) observer.observe(child);
    update();
    return () => observer.disconnect();
  }, []);
  return [ref, isOverflowing] as const;
};

const ModalContent = ({ children, ...partProps }: PartProps & { children: ReactNode }) => {
  const [ref, isOverflowing] = useIsOverflowing<HTMLDivElement>();
  return (
    <div ref={ref} {...partProps} tabIndex={isOverflowing ? 0 : undefined}>
      {children}
    </div>
  );
};

export const ModalOverlay = ({
  cancelLabel = "Cancel",
  children,
  classNameOverrides,
  className,
  closeLabel = "Close",
  footer,
  header,
  showCancelButton,
  showCloseButton = true,
  title,
  ref,
  ...props
}: ModalOverlayProps) => {
  const parts = usePartProps("modal", modalStyles, classNameOverrides, {
    overlay: {},
    component: {},
    dialog: {},
    header: {},
    title: {},
    closeButton: {},
    content: {},
    footer: {},
  });
  const rootClassName = useRootClassName(parts.component.className, className);
  const shouldShowCancelButton = showCancelButton ?? footer != null;
  const hasFooter = shouldShowCancelButton || footer != null;

  return (
    <ReactAriaModalOverlay {...props} {...parts.overlay}>
      <ReactAriaModal ref={ref} {...parts.component} className={rootClassName}>
        <ReactAriaDialog {...parts.dialog}>
          {({ close }) => (
            <>
              {header != null ? (
                <div {...parts.header}>{header}</div>
              ) : (
                <div {...parts.header}>
                  <ReactAriaHeading slot="title" {...parts.title}>
                    {title}
                  </ReactAriaHeading>
                  {showCloseButton ? (
                    <ReactAriaButton
                      aria-label={closeLabel}
                      onPress={close}
                      {...parts.closeButton}
                    >
                      <Icon icon={XIcon} size="lg" />
                    </ReactAriaButton>
                  ) : null}
                </div>
              )}
              {children != null ? (
                <ModalContent {...parts.content}>{children}</ModalContent>
              ) : null}
              {hasFooter ? (
                <div {...parts.footer}>
                  {shouldShowCancelButton ? (
                    <Button variant="secondary" onPress={close}>
                      {cancelLabel}
                    </Button>
                  ) : null}
                  {footer}
                </div>
              ) : null}
            </>
          )}
        </ReactAriaDialog>
      </ReactAriaModal>
    </ReactAriaModalOverlay>
  );
};
