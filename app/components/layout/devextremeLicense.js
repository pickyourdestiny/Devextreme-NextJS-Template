"use client";

import React from "react";
import { devextremeConfig } from "@/app/app-info";

export default function DevextremeLicense({ children }) {
  devextremeConfig();

  return <>{children}</>;
}
