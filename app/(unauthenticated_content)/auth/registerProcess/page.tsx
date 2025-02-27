"use server";

import "./registerProcess.scss";
import React from "react";
import { auth } from "@/auth";
import { registerProvider } from "@/app/api/auth/customAuth";
import AnimationWrapper from "@/app/components/layout/animation/animationWrapper";
import SuccessPage from "@/app/components/auth/registerProcess/successPage";
import { redirect } from "next/navigation";
import { providerList } from "@/auth";
import { SearchParamsType } from "@/types";

export default async function RegisterProcess({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/error");
  }

  const provider = (await searchParams).provider
    ? String((await searchParams).provider)
    : "no-provider-key";

  if (
    provider === "no-provider-key" ||
    ![...providerList, "credentials"].includes(provider)
  ) {
    redirect("auth/error");
  }

  if (providerList.includes(provider)) {
    //already signed in with provider, this part is for creating a record in your user database (to create a register provider callback)
    await registerProvider(session.user, provider);
  }

  return (
    <>
      <AnimationWrapper>
        <SuccessPage />
      </AnimationWrapper>
    </>
  );
}
