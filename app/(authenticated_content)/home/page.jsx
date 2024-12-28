import "./home.scss";
import dynamic from "next/dynamic";
import { checkSession } from "@/app/api/auth/customAuth";
import { HomePageComponent } from "@/app/components/home/homePage";

export const metadata = {
  title: "Home Page",
  description: "Home page of my awesome Web App",
};

export default async function Home() {
  // the following code will protect the page and prevent users who are not signed in from accessing it.
  // await checkSession();
  return (
    <>
      <HomePageComponent />
    </>
  );
}
