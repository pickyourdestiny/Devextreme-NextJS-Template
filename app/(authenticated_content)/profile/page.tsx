import "./profile.scss";
import { checkSession } from "@/app/api/auth/customAuth";
import Image from "next/image";
import Title from "@/app/components/layout/title/title";
import { defaultUser } from "@/utils/helpers";
import ProfileForm from "@/app/components/userProfile/profileForm";
import AnimationWrapper from "@/app/components/layout/animation/animationWrapper";

export const metadata = {
  title: "Profile Page",
  description: "Profile page of my awesome Web App",
};

export default async function Profile() {
  //const session= await checkSession()

  const userProfile =
    defaultUser; /* you can fetch the user profile directly from your db here, use the session object for a user param*/

  return (
    <AnimationWrapper>
      <Title text="profile" />
      <div className={"content-block"}>
        <ProfileForm userProfile={userProfile} />
      </div>
    </AnimationWrapper>
  );
}
