"use client";

import React, { useEffect } from "react";
import "./errorPage.scss";
import { useSearchParams } from "next/navigation";
import SingleCard from "../../layout/singleCard";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "devextreme-react";

export default function ErrorPage() {
  const search = useSearchParams();
  const session = useSession();

  const errorType = search.get("error");

  useEffect(() => {
    if (session && session.status === "authenticated") {
      signOut({ redirect: false });
    }
  }, [session]);

  return (
    <>
      <SingleCard description="Oops something went wrong..">
        <div className="oath-buttons-container">
          <div className="flex">
            <Button
              type={"default"}
              stylingMode={"contained"}
              text={"Sign In"}
              icon={"fa-duotone fa-solid fa-right-to-bracket"}
              onClick={() => signIn(undefined, { redirectTo: "/tasks" })} //calls the default signin page
            ></Button>
          </div>
        </div>
      </SingleCard>
    </>
  );
}
