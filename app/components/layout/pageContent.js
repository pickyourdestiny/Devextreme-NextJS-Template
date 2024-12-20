"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import MainToolBar from "./mainToolbar";
import SideNavigationMenu from "./sideNavigationMenu";
import ScrollView from "devextreme-react/scroll-view";
import Drawer from "devextreme-react/drawer";
import { useScreenSize } from "../utils/media-query";
import { useMenuPatch } from "../utils/patches";
import { footerInfo } from "@/app/app-info";
import { Template } from "devextreme-react/core/template";
import dynamic from "next/dynamic";
import "./pageContent.scss";

const Footer = dynamic(() => import("./footer"), {
  ssr: false,
});

export default function PageContent({ children }) {
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState(MenuStatus.Closed);

  const router = useRouter();
  const pathname = usePathname();
  const scrollViewRef = useRef(null);

  const toggleMenu = useCallback(({ event }) => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.Opened
        : MenuStatus.Closed
    );
    event.stopPropagation();
  }, []);

  const temporaryOpenMenu = useCallback(() => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.TemporaryOpened
        : prevMenuStatus
    );
  }, []);

  const onOutsideClick = useCallback(() => {
    setMenuStatus(MenuStatus.Closed);
    return true;
  }, []);

  const onNavigationChanged = useCallback(
    ({ itemData, event, node }) => {
      // console.log(node.selected, itemData.path, menuStatus);
      if (!itemData.path) {
        event.preventDefault();
        return;
      }

      //you selected the same item thats already open
      if (node.selected && pathname === itemData.path) {
        setMenuStatus(MenuStatus.Closed);
        event.stopPropagation();
        return;
      }
      router.push(itemData.path);
      scrollViewRef.current.instance().scrollTo(0);
      setTimeout(() => {
        setMenuStatus(MenuStatus.Closed);
      });

      if (menuStatus === MenuStatus.TemporaryOpened) {
        setMenuStatus(MenuStatus.Closed);
        event.stopPropagation();
      }
    },
    [router, menuStatus, pathname]
  );

  return (
    <>
      <div className="side-nav-outer-toolbar">
        <MainToolBar toggleMenu={toggleMenu} />
        <Drawer
          className={["drawer", patchCssClass].join(" ")}
          position={"before"}
          closeOnOutsideClick={onOutsideClick}
          openedStateMode={isLarge ? "shrink" : "overlap"}
          revealMode={isXSmall ? "slide" : "expand"}
          minSize={isXSmall ? 0 : 60}
          maxSize={250}
          shading={isLarge ? false : true}
          opened={menuStatus === MenuStatus.Closed ? false : true}
          template={"menu"}
        >
          <div className="container">
            <ScrollView
              ref={scrollViewRef}
              className={"layout-body with-footer"}
            >
              <div className="content">{children}</div>
              <div className="content-block">
                <Footer>
                  {footerInfo.logo && (
                    <Image
                      src={footerInfo.logo}
                      alt=""
                      width={65}
                      height={45}
                    />
                  )}

                  {footerInfo.copyRight && (
                    <div className="mt-4">
                      Copyright ©{new Date().getFullYear()}
                    </div>
                  )}

                  {footerInfo.title && (
                    <div className="mt-4">{footerInfo.title}</div>
                  )}
                </Footer>
              </div>
            </ScrollView>
          </div>
          <Template name={"menu"}>
            <SideNavigationMenu
              compactMode={menuStatus === MenuStatus.Closed}
              selectedItemChanged={onNavigationChanged}
              openMenu={temporaryOpenMenu}
              onMenuReady={onMenuReady}
            ></SideNavigationMenu>
          </Template>
        </Drawer>
      </div>
    </>
  );
}

const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3,
};
