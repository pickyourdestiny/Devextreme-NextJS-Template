import "./signin.scss";
import { Header } from "@/app/components/auth/header/header";
import {
  SignInForm,
  RegisterButton,
} from "@/app/components/auth/signin/signIn";
import { ProviderButton } from "@/app/components/auth/providerList/providerList";
import { providerMap } from "@/auth";
import AnimationWrapper from "@/app/components/layout/animation/animationWrapper";
import { ProviderType } from "@/types";

export default async function SignIn() {
  return (
    <>
      <AnimationWrapper duration={1} slideX={true}>
        <Header title="sign in" />
        <SignInForm />
        <div className="flex mt-8">or</div>
        <div className="oath-buttons-container mt-8">
          {providerMap.map((provider: ProviderType) => (
            <div key={provider.id} className="flex">
              <ProviderButton
                provider={provider}
                redirectPath={"/tasks"}
                action={"Login"}
              />
            </div>
          ))}
        </div>
        <div className="flex mt-8">or</div>
        <div className="flex mt-8">
          <RegisterButton />
        </div>
      </AnimationWrapper>
    </>
  );
}
