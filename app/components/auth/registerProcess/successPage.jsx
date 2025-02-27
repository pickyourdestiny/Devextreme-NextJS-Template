"use client";

import React, { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SuccessPage() {
  useEffect(() => {
    const delay = setTimeout(() => {
      signOut({ redirectTo: "/auth/signin" });
    }, 2500);

    return () => clearTimeout(delay);
  }, []);

  return <div className="flex">Registration Successful!</div>;
}
