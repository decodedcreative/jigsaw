"use client";

import { useEffect } from "react";
import { UNSTABLE_ToastRegion as ReactAriaToastRegion } from "react-aria-components/Toast";
import { useGetClassNames } from "@hooks";
import { DEFAULT_TOAST_REGION, getToastQueue, registerToastRegion } from "../../toast.queue";
import type { ToastRegionProps } from "./ToastRegion.types";
import { ToastItem } from "../ToastItem";
import { toastRegionStyles } from "./ToastRegion.styles";

export const ToastRegion = ({
  region = DEFAULT_TOAST_REGION,
  position = "bottom-right",
  classNameOverrides,
}: ToastRegionProps) => {
  useEffect(() => registerToastRegion(region), [region]);

  const classNames = useGetClassNames(toastRegionStyles, classNameOverrides, {
    viewport: { position },
  });

  return (
    <ReactAriaToastRegion queue={getToastQueue(region)} className={classNames.viewport}>
      {({ toast }) => <ToastItem toast={toast} />}
    </ReactAriaToastRegion>
  );
};

ToastRegion.displayName = "DS_ToastRegion";
