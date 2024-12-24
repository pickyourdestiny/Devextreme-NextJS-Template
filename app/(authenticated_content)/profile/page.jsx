import "./profile.scss";
import dynamic from "next/dynamic";
import { checkSession } from "@/app/api/auth/customAuth";

const UserProfile = dynamic(
  () => import("../../components/userProfile/userProfile"),
  {
    ssr: false,
  }
);

export const metadata = {
  title: "Profile Page",
  description: "Profile page of my awesome Web App",
};

export default async function Profile() {
  // the following code will protect the page and prevent users who are not signed in from accessing it.
  // await checkSession();

  return (
    <>
      <UserProfile userProfile={userProfile} />
    </>
  );
}
