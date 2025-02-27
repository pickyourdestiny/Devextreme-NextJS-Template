"use client";

import React from "react";
import { Button } from "devextreme-react/button";
import googleLogo from "../../../assets/logos/google.png";
import twitterLogoBlack from "../../../assets/logos/twitter-black.png";
import twitterLogoWhite from "../../../assets/logos/twitter-white.png";
import facebookLogo from "../../../assets/logos/facebook.png";
import { signIn } from "next-auth/react";
import { useTheme } from "../../../providers/themeProvider";
import { ProviderButtonProps } from "@/types";
import "./providerList.scss";

export function ProviderButton(props: ProviderButtonProps) {
  const { theme } = useTheme();
  const { provider, redirectPath, action } = props;

  return (
    <Button
      className="provider-button"
      icon={
        (provider.id === "google" && googleLogo.src) ||
        (provider.id === "twitter" &&
          theme === "light" &&
          twitterLogoBlack.src) ||
        (provider.id === "twitter" &&
          theme === "dark" &&
          twitterLogoWhite.src) ||
        (provider.id === "facebook" && facebookLogo.src)
      }
      width={"100%"}
      text={`${action} with ${
        String(provider.id).charAt(0).toUpperCase() +
        String(provider.id).slice(1)
      }`}
      onClick={() => signIn(provider.id, { redirectTo: redirectPath })}
    ></Button>
  );
}
