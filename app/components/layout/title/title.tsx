"use client";

import React from "react";
import { useScreenSize } from "@/utils/media-query";
import { TitleProps } from "@/types";

export default function Title({ text }: TitleProps) {
  const { isXSmall } = useScreenSize();

  return (
    <div className={`${isXSmall && "mt-4"}`}>
      {!isXSmall ? (
        <h2 className={"content-block capitalize"}>{text}</h2>
      ) : null}
    </div>
  );
}
