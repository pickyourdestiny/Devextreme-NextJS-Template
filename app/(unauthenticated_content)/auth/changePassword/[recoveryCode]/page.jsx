import "./changePassword.scss";
import { ChangePasswordPageComponent } from "@/app/components/auth/changePassword/changePasswordPage";

export default async function ChangePassword({ params }) {
  const { recoveryCode } = params;

  return (
    <>
      <ChangePasswordPageComponent recoveryCode={recoveryCode} />
    </>
  );
}
