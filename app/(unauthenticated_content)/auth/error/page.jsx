import "./error.scss";
import dynamic from "next/dynamic";

const ErrorPage = dynamic(
  () => import("../../../components/auth/error/errorPage"),
  {
    ssr: false,
  }
);

export default async function AuthErrors() {
  return (
    <>
      <ErrorPage />
    </>
  );
}
