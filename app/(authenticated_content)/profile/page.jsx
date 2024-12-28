import "./profile.scss";
import { checkSession } from "@/app/api/auth/customAuth";
import { defaultUser } from "@/app/components/utils/helpers";
import { UserProfileComponent } from "@/app/components/userProfile/userProfile";

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
      <UserProfileComponent userProfile={userProfile} />
    </>
  );
}
