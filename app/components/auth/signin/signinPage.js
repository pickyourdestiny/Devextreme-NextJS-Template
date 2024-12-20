"use client";

import React from "react";
import { Button } from "devextreme-react";
import googleLogo from "../../../assets/logos/google.png";
import twitterLogo from "../../../assets/logos/twitter.png";
import facebookLogo from "../../../assets/logos/facebook.png";
import SingleCard from "../../layout/singleCard";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CredentialsSignin from "./credentialsSignin";
import { providerMap } from "@/auth";
import "./signinPage.scss";

export default function SigninPage() {
  const router = useRouter();

  return (
    <SingleCard title="Sign In">
      <CredentialsSignin />
      <div className="flex mt-8">or</div>
      <div className="oath-buttons-container mt-8">
        {providerMap.map((provider) => (
          <div key={provider.id} className="flex">
            <Button
              className="provider-button"
              icon={
                (provider.id === "google" && googleLogo.src) ||
                (provider.id === "twitter" && twitterLogo.src) ||
                (provider.id === "facebook" && facebookLogo.src)
              }
              width={"100%"}
              text={`Login with ${
                String(provider.id).charAt(0).toUpperCase() +
                String(provider.id).slice(1)
              }`}
              onClick={() => signIn(provider.id, { redirectTo: "/tasks" })}
            ></Button>
          </div>
        ))}
      </div>
      <div className="flex mt-8">or</div>
      <div className="flex mt-8">
        <Button
          icon={"card"}
          text="Create an Account"
          stylingMode={"contained"}
          type={"success"}
          width={"100%"}
          onClick={() => router.push("/auth/register")}
        ></Button>
      </div>
    </SingleCard>
  );
}
