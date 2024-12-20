"use client";

import React, { useCallback } from "react";
import { Button } from "devextreme-react";
import Image from "next/image";
import yellowButton from "../../../public/yellow-button.png";
import Link from "next/link";

export default function BuyMeACoffeeButton() {
  const renderButton = useCallback(() => {
    return (
      <Image src={yellowButton} width={150} height={"auto"} alt="Click Here" />
    );
  }, []);

  return (
    <>
      <Link
        href="https://buymeacoffee.com/kx3rilmbv4"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Button
          render={renderButton}
          type={"normal"}
          stylingMode={"text"}
          width={160}
          height={"auto"}
        ></Button>
      </Link>
    </>
  );
}
