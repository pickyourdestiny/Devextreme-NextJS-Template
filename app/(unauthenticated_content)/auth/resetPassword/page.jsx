import "./resetPassword.scss";
import { Header } from "@/app/components/auth/header/header";
import ResetPasswordForm from "@/app/components/auth/resetPassword/resetPasswordForm";
import AnimationWrapper from "@/app/components/layout/animation/animationWrapper";

export default async function ResetPassword() {
  return (
    <>
      <AnimationWrapper duration={1} slideX={true}>
        <Header title={"reset password"} />
        <ResetPasswordForm />
      </AnimationWrapper>
    </>
  );
}
