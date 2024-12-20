"use client";

import "./passwordResetPage.scss";
import React, { useRef, useCallback } from "react";
import SingleCard from "../../layout/singleCard";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
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

export default function PasswordResetPage() {
  const router = useRouter();
  const formData = useRef({ email: "" });
  const { pending } = useFormStatus();

  const onSubmit = useCallback(
    async (e) => {
      const { isOk } = await resetPassword(formData.current);
      if (isOk) {
        notify(notificationText, "success", 2500);
        router.push("/auth/signin");
      } else {
        router.push("/auth/error");
      }
    },
    [router]
  );

  return (
    <SingleCard title="Reset Password">
      <form className={"reset-password-form"} action={onSubmit}>
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
          <ButtonItem>
            <ButtonOptions
              elementAttr={submitButtonAttributes}
              width={"100%"}
              type={"default"}
              text="Reset my password"
              useSubmitBehavior={true}
              disabled={pending}
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
    </SingleCard>
  );
}

const notificationText =
  "We've sent a link to reset your password. Check your inbox.";
const emailEditorOptions = {
  stylingMode: "filled",
  placeholder: "Email",
  mode: "email",
};
const submitButtonAttributes = { class: "submit-button" };
