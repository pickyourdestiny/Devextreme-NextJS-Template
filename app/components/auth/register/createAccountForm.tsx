"use client";

import React, { useRef, useCallback } from "react";
import Link from "next/link";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  EmailRule,
  StringLengthRule,
} from "devextreme-react/form";
import { ButtonTypes } from "devextreme-react/cjs/button";
import { ValidationCallbackData } from "devextreme-react/common";
import { registerCredentials } from "@/app/api/auth/customAuth";
import "./createAccountForm.scss";

export default function CreateAccountForm() {
  const formDataRef = useRef({ email: "", password: "" });
  const formRef = useRef(null);

  const submitData = useCallback(async (formData: FormData) => {
    const formInstance = formRef.current.instance();
    formInstance.option("disabled", true);
    formInstance.clear();
    await registerCredentials(formData);
  }, []);

  const submitMessaging = useCallback((e: ButtonTypes.ClickEvent) => {
    const result = e.validationGroup.validate();
    if (result.isValid) {
      e.component.option("text", "Registering..");
    }
  }, []);

  const confirmPassword = useCallback(
    ({ value }: ValidationCallbackData) =>
      value === formDataRef.current.password,
    []
  );

  return (
    <form className={"create-account-form"} action={submitData}>
      <Form ref={formRef} formData={formDataRef.current}>
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
          <StringLengthRule
            min={8}
            message="Password must be at least 8 characters"
          />
          <Label visible={false} />
        </Item>
        <Item
          dataField={"confirmedPassword"}
          editorType={"dxTextBox"}
          editorOptions={confirmedPasswordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <CustomRule
            message={"Passwords do not match"}
            validationCallback={confirmPassword}
          />
          <Label visible={false} />
        </Item>

        <ButtonItem>
          <ButtonOptions
            width={"100%"}
            type={"default"}
            useSubmitBehavior={true}
            disabled={false}
            onClick={submitMessaging}
            text={"Create a new account"}
          ></ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={"login-link"}>
            <span className="mr-4">Have an account?</span>{" "}
            <Link href={"/auth/signin"}>Sign In</Link>
          </div>
        </Item>
      </Form>
    </form>
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
const confirmedPasswordEditorOptions = {
  stylingMode: "filled",
  placeholder: "Confirm Password",
  mode: "password",
};
