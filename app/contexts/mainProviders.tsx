"use client";

import { SessionProvider } from "next-auth/react";
import ClassProvider from "../providers/classProvider";
import { ThemeProvider } from "../providers/themeProvider";

export function MainProviders(props: React.PropsWithChildren<unknown>) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <ClassProvider>{props.children}</ClassProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
