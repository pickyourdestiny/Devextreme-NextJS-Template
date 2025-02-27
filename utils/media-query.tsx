"use client";

import { useState, useCallback, useEffect } from "react";
import { MediaEventListenerCallback } from "@/types";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({ ...screenSizes });

  const updateTarget: MediaEventListenerCallback = useCallback((e) => {
    const { media, matches } = e;
    if (media === "(max-width: 599px)" && matches) {
      setScreenSize({ ...screenSizes, isXSmall: true });
    }
    if (media === "(min-width: 600px) and (max-width: 959.99px)" && matches) {
      setScreenSize({ ...screenSizes, isSmall: true });
    }
    if (media === "(min-width: 960px) and (max-width: 1279.99px)" && matches) {
      setScreenSize({ ...screenSizes, isMedium: true });
    }
    if (media === "(min-width: 1280px)" && matches) {
      setScreenSize({ ...screenSizes, isLarge: true });
    }
  }, []);

  useEffect(() => {
    const isXSmall = window.matchMedia("(max-width: 599px)");
    const isSmall = window.matchMedia(
      "(min-width: 600px) and (max-width: 959.99px)"
    );
    const isMedium = window.matchMedia(
      "(min-width: 960px) and (max-width: 1279.99px)"
    );
    const isLarge = window.matchMedia("(min-width: 1280px)");

    isXSmall.addEventListener("change", updateTarget);
    isSmall.addEventListener("change", updateTarget);
    isMedium.addEventListener("change", updateTarget);
    isLarge.addEventListener("change", updateTarget);

    //this is the initial match when the client window loads (not the "change" event listener)
    if (isXSmall.matches) {
      setScreenSize((previousState) => ({ ...previousState, isXSmall: true }));
    }
    if (isSmall.matches) {
      setScreenSize((previousState) => ({ ...previousState, isSmall: true }));
    }
    if (isMedium.matches) {
      setScreenSize((previousState) => ({ ...previousState, isMedium: true }));
    }
    if (isLarge.matches) {
      setScreenSize((previousState) => ({ ...previousState, isLarge: true }));
    }

    return () => {
      isXSmall.removeEventListener("change", updateTarget);
      isSmall.removeEventListener("change", updateTarget);
      isMedium.removeEventListener("change", updateTarget);
      isLarge.removeEventListener("change", updateTarget);
    };
  }, [updateTarget]);

  return screenSize;
};
export const useScreenSizeClass = () => {
  const screenSize = useScreenSize();

  if (screenSize.isLarge) {
    return "screen-large";
  }

  if (screenSize.isMedium) {
    return "screen-medium";
  }

  if (screenSize.isSmall) {
    return "screen-small";
  }

  return "screen-x-small";
};

const screenSizes = {
  isXSmall: false,
  isSmall: false,
  isMedium: false,
  isLarge: false,
};
