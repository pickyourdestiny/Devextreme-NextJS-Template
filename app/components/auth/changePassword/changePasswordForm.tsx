"use client";

import React, { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  StringLengthRule,
} from "devextreme-react/form";
import { changePassword } from "@/app/api/auth/customAuth";
import notify from "devextreme/ui/notify";
import { RecoveryCodeType } from "@/types";
import { ValidationCallbackData } from "devextreme-react/common";

export default function ChangePasswordForm({ recoveryCode }: RecoveryCodeType) {
  const router = useRouter();
  const formData = useRef({ password: "" });
  const formRef = useRef(null);

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const formInstance = formRef.current.instance();
      formInstance.option("disabled", true);
      formInstance.clear();
      formData.append("recoveryCode", recoveryCode);
      const { isOk } = await changePassword(formData);
      if (isOk) {
        notify(notificationText, "success", 4000);
        router.push("/auth/signin");
      } else {
        router.push("/auth/error");
      }
    },
    [recoveryCode, router]
  );

  const confirmPassword = useCallback(
    ({ value }: ValidationCallbackData) => value === formData.current.password,
    []
  );

  return (
    <form action={onSubmit}>
      <Form ref={formRef} formData={formData.current}>
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
            text={"Continue"}
          ></ButtonOptions>
        </ButtonItem>
      </Form>
    </form>
  );
}

const passwordEditorOptions = {
  stylingMode: "filled",
  placeholder: "New Password",
  mode: "password",
};
const confirmedPasswordEditorOptions = {
  stylingMode: "filled",
  placeholder: "Confirm Password",
  mode: "password",
};

const notificationText =
  "Your password was changed successfully. Remember to login with your new password";
