import "./profile.scss";
import dynamic from "next/dynamic";
import { checkSession } from "@/app/api/auth/customAuth";
import { defaultUser } from "@/app/components/utils/helpers";

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
  var userProfile;
  // the following code will protect the page and prevent users who are not signed in from accessing it.
  // if you retrieve the userprofile from line23, you can comment out line 25

  // userProfile=await checkSession();

  userProfile = defaultUser;

  return (
    <>
      <UserProfile userProfile={userProfile} />
    </>
  );
}
