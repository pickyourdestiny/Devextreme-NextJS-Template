"use client";

import React, { useMemo } from "react";
import ContextMenu, {
  Position,
  ContextMenuTypes,
} from "devextreme-react/context-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useScreenSize } from "@/utils/media-query";
import { Toolbar, ToolbarRef } from "devextreme-react/toolbar";
import { ToolBarRefType } from "@/types";
import "./userPanel.scss";

export default function UserPanel({ toolBarRef }: ToolBarRefType) {
  const { isXSmall } = useScreenSize();
  const router = useRouter();

  const menuItems = useMemo(() => {
    function navigateToProfile() {
      if (isXSmall) {
        toolBarRef.current
          .instance()
          .repaint(); /*repaint the toolbar for hidden menu onclick events*/
      }

      router.push("/profile");
    }
    return [
      {
        text: "Profile",
        icon: "user",
        onClick: navigateToProfile,
      },
      {
        text: "Logout",
        icon: "runner",
        onClick: () =>
          signOut({
            callbackUrl: "/auth/signin",
          }),
      },
    ];
  }, [router, toolBarRef, isXSmall]);

  const itemTemplate = (itemData: ContextMenuTypes.Item) => (
    <div className="item-template-container">
      {itemData.icon && (
        <span className={`dx-icon-${itemData.icon} dx-icon`}></span>
      )}
      <span className="dx-menu-item-text">{itemData.text}</span>
    </div>
  );

  return (
    <div className={"user-panel"}>
      <ContextMenu
        items={menuItems}
        target={".user-button"}
        showEvent={"dxclick"}
        width={150}
        cssClass={"user-menu"}
        itemRender={itemTemplate}
      >
        <Position my={"top"} at={"bottom"} />
      </ContextMenu>
    </div>
  );
}
