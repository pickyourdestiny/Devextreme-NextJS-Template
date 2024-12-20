"use client";

import React from "react";
import { useScreenSizeClass } from "../utils/media-query";

export default function ScreenSizeClass(props) {
  const screenSizeClass = useScreenSizeClass();

  return <div className={`app ${screenSizeClass}`}>{props.children}</div>;
}
