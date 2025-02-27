"use client";

import { useState, useCallback } from "react";
import { useScreenSize } from "./media-query";
import { DrawerContextType } from "@/types";

export function useMenuPatch() {
  const { isSmall, isMedium } = useScreenSize();
  const [enabled, setEnabled] = useState(isSmall || isMedium);
  const onMenuReady: DrawerContextType["onMenuReady"] = useCallback(() => {
    if (!enabled) {
      return;
    }

    setTimeout(() => setEnabled(false));
  }, [enabled]);

  return {
    patchCssClass: enabled ? "pre-init-blink-fix" : "",
    onMenuReady,
  };
}
