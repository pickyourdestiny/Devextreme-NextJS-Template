"use client";

import React, { useCallback, useRef } from "react";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule,
} from "devextreme-react/form";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function CredentialsSignin() {
  const formData = useRef({ email: "", password: "" });

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    const credentials = formData.current;
    await signIn("signin", { credentials, callbackUrl: "/tasks" });
  }, []);

  return (
    <>
      <form className={"login-form"} onSubmit={onSubmit}>
        <Form formData={formData.current}>
          <Item
            dataField={"email"}
            editorType={"dxTextBox"}
            editorOptions={emailEditorOptions}
          >
            <RequiredRule message="Email is required" />
            <EmailRule message="Email is invalid" />
            <Label visible={false} />
          </Item>
          <Item
            dataField={"password"}
            editorType={"dxTextBox"}
            editorOptions={passwordEditorOptions}
          >
            <RequiredRule message="Password is required" />
            <Label visible={false} />
          </Item>
          <Item
            dataField={"rememberMe"}
            editorType={"dxCheckBox"}
            editorOptions={rememberMeEditorOptions}
          >
            <Label visible={false} />
          </Item>
          <ButtonItem>
            <ButtonOptions
              width={"100%"}
              type={"default"}
              useSubmitBehavior={true}
              text="Sign In"
            ></ButtonOptions>
          </ButtonItem>
          <Item>
            <div className={"link flex"}>
              <Link href={"/auth/resetPassword"}>Forgot password?</Link>
            </div>
          </Item>
        </Form>
      </form>
    </>
  );
}

const emailEditorOptions = {
  stylingMode: "filled",
  placeholder: "Email",
  mode: "email",
};
const passwordEditorOptions = {
  stylingMode: "filled",
  placeholder: "Password",
  mode: "password",
};
const rememberMeEditorOptions = {
  text: "Remember me",
  elementAttr: { class: "form-text" },
};
