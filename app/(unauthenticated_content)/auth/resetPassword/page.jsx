import "./resetPassword.scss";
import dynamic from "next/dynamic";

const PasswordResetPage = dynamic(
  () => import("../../../components/auth/resetPassword/passwordResetPage"),
  {
    ssr: false,
  }
);

export default async function ResetPassword() {
  return (
    <>
      <PasswordResetPage />
    </>
  );
}
