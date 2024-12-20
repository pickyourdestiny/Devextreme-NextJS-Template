"use client";
import React from "react";
import SingleCard from "../../layout/singleCard";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "devextreme-react";
import CreateAccountForm from "./createAccountForm";
import googleLogo from "../../../assets/logos/google.png";
import twitterLogo from "../../../assets/logos/twitter.png";
import facebookLogo from "../../../assets/logos/facebook.png";
import { providerMap } from "@/auth";
import "./registerPage.scss";

export default function registerPage() {
  return (
    <SingleCard title={"Sign Up"}>
      <CreateAccountForm />
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
              text={`Register with ${
                String(provider.id).charAt(0).toUpperCase() +
                String(provider.id).slice(1)
              }`}
              onClick={() =>
                signIn(provider.id, {
                  redirectTo: `/auth/registerProcess?provider=${provider.id}`,
                })
              }
            ></Button>
          </div>
        ))}
      </div>
      <div className="policy-info ">
        By creating an account, you agree to the{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>
      </div>
    </SingleCard>
  );
}
