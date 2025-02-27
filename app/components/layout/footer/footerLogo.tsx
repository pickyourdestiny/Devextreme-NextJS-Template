"use client";

import React from "react";
import { footerInfo } from "@/app-info";
import { useTheme } from "../../../providers/themeProvider";
import { isEmpty } from "lodash";
import Image from "next/image";

export default function FooterLogo() {
  const { theme } = useTheme();
  const { logo } = footerInfo;

  if (!isEmpty(logo)) {
    return (
      <Image
        className={"mr-4"}
        src={theme === "light" ? logo.black : logo.white}
        alt=""
        width={65}
        height={45}
        style={logoStyle}
      />
    );
  }

  return null;
}

const logoStyle = { objectFit: "contain" as const };
