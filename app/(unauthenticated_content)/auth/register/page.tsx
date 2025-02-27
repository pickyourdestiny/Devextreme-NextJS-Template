import "./register.scss";
import { Header } from "@/app/components/auth/header/header";
import CreateAccountForm from "@/app/components/auth/register/createAccountForm";
import { providerMap } from "@/auth";
import { ProviderButton } from "@/app/components/auth/providerList/providerList";
import Link from "next/link";
import AnimationWrapper from "@/app/components/layout/animation/animationWrapper";
import { ProviderType } from "@/types";

export default async function Register() {
  return (
    <>
      <AnimationWrapper duration={1} slideX={true}>
        <Header title="create account" />
        <CreateAccountForm />
        <div className="flex mt-8">or</div>
        <div className="oath-buttons-container mt-8">
          {providerMap.map((provider: ProviderType) => (
            <div key={provider.id} className="flex">
              <ProviderButton
                provider={provider}
                redirectPath={`/auth/registerProcess?provider=${provider.id}`}
                action={"Register"}
              />
            </div>
          ))}
        </div>
        <div className="policy-info ">
          By creating an account, you agree to the{" "}
          <Link href="#">Terms of Service</Link> and{" "}
          <Link href="#">Privacy Policy</Link>
        </div>
      </AnimationWrapper>
    </>
  );
}
