"use client";

import "./resetPasswordForm.scss";
import React, { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule,
} from "devextreme-react/form";
import notify from "devextreme/ui/notify";
import { resetPassword } from "@/app/api/auth/customAuth";

export default function ResetPasswordForm() {
  const router = useRouter();
  const formRef = useRef(null);

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const formInstance = formRef.current.instance();
      formInstance.option("disabled", true);
      formInstance.clear();
      const { isOk } = await resetPassword(formData);
      if (isOk) {
        notify(notificationText, "success", 4000);
        router.push("/auth/signin");
      } else {
        router.push("/auth/error");
      }
    },
    [router]
  );

  return (
    <form className={"reset-password-form"} action={onSubmit}>
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
        <ButtonItem>
          <ButtonOptions
            elementAttr={submitButtonAttributes}
            width={"100%"}
            type={"default"}
            text="Reset my password"
            useSubmitBehavior={true}
            disabled={false}
          ></ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={"login-link flex"}>
            <span>
              Return to <Link href={"/auth/signin"}>Sign In</Link>
            </span>
          </div>
        </Item>
      </Form>
    </form>
  );
}

const notificationText =
  "We have emailed you a link to reset your password. Please check your inbox.";
const emailEditorOptions = {
  stylingMode: "filled",
  placeholder: "Email",
  mode: "email",
};
const submitButtonAttributes = { class: "submit-button" };
