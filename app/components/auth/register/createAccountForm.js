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
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { registerCredentials } from "@/app/api/auth/customAuth";
import "./createAccountForm.scss";

export default function CreateAccountForm() {
  const router = useRouter();
  const formData = useRef({ email: "", password: "" });
  const { pending } = useFormStatus();

  const onSubmit = useCallback(async () => {
    await registerCredentials(formData.current);
  }, []);

  const confirmPassword = useCallback(
    ({ value }) => value === formData.current.password,
    []
  );

  return (
    <form className={"create-account-form"} action={onSubmit}>
      <Form formData={formData.current} disabled={pending}>
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
            disabled={pending}
            text={"Create a new account"}
          ></ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={"login-link"}>
            Have an account? <Link href={"/auth/signin"}>Sign In</Link>
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
