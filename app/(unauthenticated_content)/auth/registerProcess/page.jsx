import "./registerProcess.scss";
import { auth } from "@/auth";
import { registerProvider } from "@/app/api/auth/customAuth";
import { SuccessPageComponent } from "@/app/components/auth/registerProcess/successPage";

export default async function RegisterProcess({ searchParams }) {
  const session = await auth();

  var { provider } = await searchParams;

  if (provider !== "credentials" && session) {
    await registerProvider(session.user, provider);
  }

  return (
    <>
      <SuccessPageComponent />
    </>
  );
}
