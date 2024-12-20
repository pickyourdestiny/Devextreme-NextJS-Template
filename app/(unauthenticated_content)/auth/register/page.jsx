import "./register.scss";
import dynamic from "next/dynamic";

const RegisterPage = dynamic(
  () => import("../../../components/auth/register/registerPage"),
  {
    ssr: false,
  }
);

export default async function Register() {
  return (
    <>
      <RegisterPage />
    </>
  );
}
