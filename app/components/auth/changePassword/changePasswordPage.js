"use client";

import React, { useRef, useCallback } from "react";
import SingleCard from "../../layout/singleCard";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
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
import dynamic from "next/dynamic";

function ChangePasswordPage({ recoveryCode }) {
  const router = useRouter();
  const formData = useRef({ password: "" });
  const { pending } = useFormStatus();

  const onSubmit = useCallback(async () => {
    const { password: newPassword } = formData.current;
    const { isOk } = await changePassword(newPassword, recoveryCode);
    if (isOk) {
      notify(notificationText, "success", 2500);
      signIn(undefined, { redirectTo: "/tasks" });
    } else {
      router.push("/auth/error");
    }
  }, [recoveryCode, router]);

  const confirmPassword = useCallback(
    ({ value }) => value === formData.current.password,
    []
  );

  return (
    <SingleCard title={"Change Password"}>
      <form action={onSubmit}>
        <Form formData={formData.current} disabled={pending}>
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
              text={"Continue"}
            ></ButtonOptions>
          </ButtonItem>
        </Form>
      </form>
    </SingleCard>
  );
}

export const ChangePasswordPageComponent = dynamic(
  () => Promise.resolve(ChangePasswordPage),
  {
    ssr: false,
  }
);

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

const notificationText = "Your password was changed successfully";
