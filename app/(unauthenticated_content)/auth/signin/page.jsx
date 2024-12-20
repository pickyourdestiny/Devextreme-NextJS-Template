import "./signin.scss";
import dynamic from "next/dynamic";

const SigninPage = dynamic(
  () => import("../../../components/auth/signin/signinPage"),
  {
    ssr: false,
  }
);

export default async function SignIn() {
  return (
    <>
      <SigninPage />
    </>
  );
}
