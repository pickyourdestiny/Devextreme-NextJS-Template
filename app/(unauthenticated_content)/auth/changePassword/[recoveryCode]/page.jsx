import "./changePassword.scss";
import dynamic from "next/dynamic";

const ChangePasswordPage = dynamic(
  () => import("../../../../components/auth/changePassword/changePasswordPage"),
  {
    ssr: false,
  }
);

export default async function ChangePassword({ params }) {
  const { recoveryCode } = params;

  return (
    <>
      <ChangePasswordPage recoveryCode={recoveryCode} />
    </>
  );
}
