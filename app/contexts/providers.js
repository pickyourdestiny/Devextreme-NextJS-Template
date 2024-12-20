"use client";

import { SessionProvider } from "next-auth/react";
import ScreenSizeClass from "../components/layout/screenSizeClass";
import DevextremeLicense from "../components/layout/devextremeLicense";

export function Providers(props) {
  return (
    <SessionProvider>
      <DevextremeLicense>
        <ScreenSizeClass>{props.children}</ScreenSizeClass>
      </DevextremeLicense>
    </SessionProvider>
  );
}
