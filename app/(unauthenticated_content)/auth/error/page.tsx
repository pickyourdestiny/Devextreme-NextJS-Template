import "./error.scss";
import { auth, signOut } from "@/auth";
import BackToSigninButton from "@/app/components/auth/error/errorPage";

export default async function AuthErrors() {
  const session = auth();
  if (session) {
    await signOut({ redirect: false });
  }

  return (
    <>
      <div className="flex">
        <div className="mb-8">Oops something went wrong..</div>
        <div className="mt-8">
          <BackToSigninButton />
        </div>
      </div>
    </>
  );
}
