"use client";

import React, { useCallback, useRef, useState } from "react";
import Form, {
  FormRef,
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule,
} from "devextreme-react/form";
import { Button, ButtonTypes } from "devextreme-react/button";
import Link from "next/link";
import { credentialsSignIn } from "@/app/api/auth/customAuth";
import { useRouter } from "next/navigation";

function RegisterButton() {
  const router = useRouter();
  return (
    <Button
      icon={"card"}
      text="Create an Account"
      stylingMode={"contained"}
      type={"success"}
      width={"100%"}
      onClick={() => router.push("/auth/register")}
    ></Button>
  );
}
function SignInForm() {
  const formRef = useRef<FormRef>(null);

  const submitMessaging = useCallback((e: ButtonTypes.ClickEvent) => {
    const result = e.validationGroup.validate();
    if (result.isValid) {
      e.component.option("text", "Signing In..");
    }
  }, []);

  const submitData = useCallback(async (formData: FormData) => {
    const formInstance = formRef.current.instance();
    formInstance.option("disabled", true);
    formInstance.clear();
    await credentialsSignIn(formData);
  }, []);

  return (
    <>
      <form action={submitData}>
        <Form ref={formRef}>
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
              disabled={false}
              icon={"login"}
              onClick={submitMessaging}
              text={"Sign In"}
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

export { SignInForm, RegisterButton };

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
