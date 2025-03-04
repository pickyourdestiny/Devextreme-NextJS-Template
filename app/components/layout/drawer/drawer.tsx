"use client";

import React from "react";
import SideNavigationMenu from "./sideNavigationMenu";
import { Drawer as DrawerWidget } from "devextreme-react/drawer";
import { useScreenSize } from "@/utils/media-query";
import { useDrawer } from "../../../providers/drawerProvider";

export default function Drawer({ children }: { children: React.ReactNode }) {
  const { isXSmall, isLarge } = useScreenSize();
  const { menuStatus, onOutsideClick, MenuStatus, patchCssClass } = useDrawer();

  return (
    <>
      <DrawerWidget
        className={["drawer", patchCssClass].join(" ")}
        position={"before"}
        closeOnOutsideClick={onOutsideClick}
        openedStateMode={isLarge ? "shrink" : "overlap"}
        revealMode={isXSmall ? "slide" : "expand"}
        minSize={isXSmall ? 0 : 60}
        maxSize={250}
        shading={isLarge ? false : true}
        opened={menuStatus === MenuStatus.Closed ? false : true}
        component={SideNavigationMenu}
      >
        <div className="container overflow-y">{children}</div>
      </DrawerWidget>
    </>
  );
}
