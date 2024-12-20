"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Toolbar, { Item } from "devextreme-react/toolbar";
import Button from "devextreme-react/button";
import "./mainToolbar.scss";
import Image from "next/image";
import { headerInfo } from "@/app/app-info";
import { useScreenSize } from "../utils/media-query";
import { garamond } from "../utils/helpers";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserPanel from "./userPanel";

export default function MainToolBar({ toggleMenu }) {
  const { isXSmall } = useScreenSize();
  const { data: session } = useSession();
  const router = useRouter();

  const toolbarRef = useRef(null);

  const renderTitle = useCallback(() => {
    return (
      <div className={"flex-row flex-gap-8"}>
        {headerInfo.logo && (
          <Image
            src={headerInfo.logo}
            alt=""
            tabIndex={tabIndex}
            height="55"
            width="60"
          />
        )}
        {headerInfo.title && (
          <div
            className={
              isXSmall
                ? `font-size-17 ${garamond.className}`
                : `font-size-24 ${garamond.className}`
            }
          >
            {headerInfo.title}
          </div>
        )}
      </div>
    );
  }, [isXSmall]);

  return (
    <header className={"header-component"}>
      <Toolbar ref={toolbarRef} className={"header-toolbar"}>
        <Item location={"before"} cssClass="menu-button">
          <Button
            icon="menu"
            stylingMode="text"
            type={"normal"}
            onClick={toggleMenu}
          />
        </Item>
        <Item location={"center"} render={renderTitle}></Item>
        <Item location={"after"} cssClass="menu-button">
          <Button
            id="tasks-button"
            icon="taskcomplete"
            stylingMode="text"
            type={"default"}
            onClick={() => router.push("/tasks")}
            hint="Tasks"
          ></Button>
        </Item>
        <Item location={"after"} locateInMenu={"auto"}>
          {session ? (
            <Button
              className={"user-button"}
              height={"100%"}
              stylingMode={"text"}
            >
              <UserPanel toolbarRef={toolbarRef} />
            </Button>
          ) : (
            <Button
              elementAttr={userButtonAttr}
              icon="login"
              stylingMode="text"
              type={"default"}
              text="Sign In"
              onClick={() => signIn(undefined, { redirectTo: "/tasks" })}
              width={100}
            />
          )}
        </Item>
      </Toolbar>
    </header>
  );
}

const tabIndex = -1;

const userButtonAttr = {
  id: "header-user-button",
};
