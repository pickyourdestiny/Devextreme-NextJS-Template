import "./registerProcess.scss";
import dynamic from "next/dynamic";
import { auth } from "@/auth";
import { registerProvider } from "@/app/api/auth/customAuth";

const SuccessPage = dynamic(
  () => import("../../../components/auth/registerProcess/successPage"),
  {
    ssr: false,
  }
);

export default async function RegisterProcess({ searchParams }) {
  const session = await auth();

  var { provider } = await searchParams;

  if (provider !== "credentials" && session) {
    await registerProvider(session.user, provider);
  }

  return (
    <>
      <SuccessPage />
    </>
  );
}
