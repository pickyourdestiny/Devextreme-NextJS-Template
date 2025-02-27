"use client";

import React from "react";
import { useScreenSizeClass } from "@/utils/media-query";
import { useTheme } from "./themeProvider";

export default function ClassProvider({
  children,
}: React.PropsWithChildren<unknown>) {
  const screenSizeClass = useScreenSizeClass();
  const { theme } = useTheme();

  return (
    <div className={`app ${screenSizeClass} ${theme}-mode`}>{children}</div>
  );
}
