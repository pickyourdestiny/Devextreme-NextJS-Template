"use client";

import React, { useEffect } from "react";
import SingleCard from "../../layout/singleCard";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function SuccessPage() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session) {
      const delay = setTimeout(() => {
        signOut({ redirect: false });
        router.push("/auth/signin");
      }, 2500);

      return () => clearTimeout(delay);
    }
  }, [session, router]);

  return <SingleCard description="Registration Successful!"></SingleCard>;
}
