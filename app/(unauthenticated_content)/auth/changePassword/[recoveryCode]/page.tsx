import "./changePassword.scss";
import ChangePasswordForm from "@/app/components/auth/changePassword/changePasswordForm";
import { Header } from "@/app/components/auth/header/header";
import AnimationWrapper from "@/app/components/layout/animation/animationWrapper";
import { RecoveryCodeType } from "@/types";

export default async function ChangePassword({
  params,
}: {
  params: Promise<RecoveryCodeType>;
}) {
  const recoveryCode = (await params).recoveryCode;

  return (
    <>
      <AnimationWrapper duration={1} slideY={true}>
        <Header title={"change password"} />
        <ChangePasswordForm recoveryCode={recoveryCode} />
      </AnimationWrapper>
    </>
  );
}
