"use client";

import { DialogTrigger as ReactAriaDialogTrigger } from "react-aria-components";
import { Button } from "../button/Button";
import type { ModalProps } from "./Modal.types";
import { ModalOverlay } from "./ModalOverlay";

export const Modal = ({ trigger, ...props }: ModalProps) => {
  const isControlled = props.isOpen !== undefined;
  const triggerElement = trigger ?? <Button>Open</Button>;

  if (process.env.NODE_ENV !== "production" && isControlled && props.onOpenChange === undefined) {
    console.warn(
      "Modal: `isOpen` was provided without `onOpenChange`. " +
        "Controlled modals need `onOpenChange` to dismiss."
    );
  }

  if (isControlled) {
    return <ModalOverlay {...props} />;
  }

  return (
    <ReactAriaDialogTrigger>
      {triggerElement}
      <ModalOverlay {...props} />
    </ReactAriaDialogTrigger>
  );
};

Modal.displayName = "DS_Modal";

export default Modal;
