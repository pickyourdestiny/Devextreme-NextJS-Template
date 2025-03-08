"use client";

import React, { useCallback, useRef } from "react";
import Toolbar, { Item, ToolbarRef } from "devextreme-react/toolbar";
import Button from "devextreme-react/button";
import Image from "next/image";
import { headerInfo } from "@/app-info";
import { useScreenSize } from "@/utils/media-query";
import { garamond } from "@/utils/helpers";
import { useSession, signIn } from "next-auth/react";
import { useDrawer } from "../../../providers/drawerProvider";
import UserPanel from "./userPanel/userPanel";
import ThemeSwitch from "./themeSwitch/themeSwitch";
import "./mainToolbar.scss";

export default function MainToolBar() {
  const { isXSmall } = useScreenSize();
  const { data: session } = useSession();
  const { toggleMenu } = useDrawer();

  const toolBarRef = useRef<ToolbarRef>(null);

  const clickSignIn = useCallback(async () => {
    await signIn(undefined);
  }, []);

  const renderTitle = useCallback(() => {
    return (
      <div className={"flex-row flex-gap-8"}>
        {headerInfo.logo && (
          <Image
            src={headerInfo.logo}
            alt=""
            tabIndex={tabIndex}
            height="40"
            width="40"
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
      <Toolbar ref={toolBarRef} className={"header-toolbar"}>
        <Item location={"before"} cssClass="menu-button">
          <Button
            icon="menu"
            id={"toggle-menu-button"}
            stylingMode="text"
            type={"normal"}
            onClick={toggleMenu}
          />
        </Item>
        <Item location={"center"} render={renderTitle}></Item>
        <Item location={"after"}>
          <ThemeSwitch />
        </Item>
        <Item location={"after"} locateInMenu={"auto"}>
          {session && session.user ? (
            <Button
              className={"user-button"}
              height={"100%"}
              stylingMode={"text"}
              width={150}
            >
              <div className={"user-info"}>
                <div className={"image-container"}>
                  {session.user.image && (
                    <img
                      alt={""}
                      src={session.user.image}
                      width={30}
                      height={30}
                    />
                  )}
                </div>
                <div className={"user-name"}>{session.user.name}</div>
              </div>
              <UserPanel toolBarRef={toolBarRef} />
            </Button>
          ) : (
            <Button
              elementAttr={userButtonAttr}
              icon="login"
              stylingMode={"contained"}
              type="normal"
              text="Sign In"
              onClick={clickSignIn}
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
