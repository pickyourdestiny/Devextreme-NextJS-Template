"use client";

import React from "react";
import dynamic from "next/dynamic";
import "./footer.scss";

function Footer({ ...rest }) {
  return <footer className={"footer"} {...rest} />;
}

export const FooterComponent = dynamic(() => Promise.resolve(Footer), {
  ssr: false,
});
