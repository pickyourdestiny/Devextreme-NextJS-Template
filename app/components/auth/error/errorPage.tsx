"use client";

import React from "react";
import "./errorPage.scss";
import { signIn } from "next-auth/react";
import { Button } from "devextreme-react";

export default function BackToSigninButton() {
  return (
    <>
      <Button
        width={"100%"}
        type={"default"}
        stylingMode={"contained"}
        text={"Sign In"}
        icon={"login"}
        onClick={() => signIn(undefined, { redirectTo: "/tasks" })} //calls the default signin page
      ></Button>
    </>
  );
}
