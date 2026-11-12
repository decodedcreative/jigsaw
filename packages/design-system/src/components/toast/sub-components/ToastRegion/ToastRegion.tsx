"use client";

import { useEffect } from "react";
import { UNSTABLE_ToastRegion as ReactAriaToastRegion } from "react-aria-components/Toast";
import { useGetClassNames, useRootClassName } from "@hooks";
import { DEFAULT_TOAST_REGION, getToastQueue, registerToastRegion } from "../../toast.queue";
import type { ToastRegionProps } from "./ToastRegion.types";
import { ToastItem } from "../ToastItem";
import { toastRegionStyles } from "./ToastRegion.styles";

export const ToastRegion = ({
  region = DEFAULT_TOAST_REGION,
  position = "bottom-right",
  classNameOverrides,
  className,
}: ToastRegionProps) => {
  useEffect(() => registerToastRegion(region), [region]);

  const classNames = useGetClassNames(toastRegionStyles, classNameOverrides, {
    component: { position },
  });
  const rootClassName = useRootClassName(classNames.component, className);

  return (
    <ReactAriaToastRegion queue={getToastQueue(region)} className={rootClassName}>
      {({ toast }) => <ToastItem toast={toast} />}
    </ReactAriaToastRegion>
  );
};

ToastRegion.displayName = "DS_ToastRegion";
