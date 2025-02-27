"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { TreeView, TreeViewRef } from "devextreme-react/tree-view";
import { navigation } from "@/app-navigation";
import { useScreenSize } from "@/utils/media-query";
import "./sideNavigationMenu.scss";
import { usePathname } from "next/navigation";
import { useDrawer } from "@/app/providers/drawerProvider";

import * as events from "devextreme/events";

export default function SideNavigationMenu() {
  const {
    onNavigationChanged: selectedItemChanged,
    temporaryOpenMenu: openMenu,
    onMenuReady,
    toggleMenu,
    menuStatus,
    MenuStatus,
  } = useDrawer();

  const { isLarge } = useScreenSize();
  const pathname = usePathname();
  const treeViewRef = useRef<TreeViewRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const normalizePath = useCallback(() => {
    let navMenu = navigation;

    return (
      navMenu &&
      navMenu.map((item) => ({
        ...item,
        expanded: isLarge,
        path: item.path && !/^\//.test(item.path) ? `/${item.path}` : item.path,
      }))
    );
  }, [isLarge]);

  const items = useMemo(normalizePath, [normalizePath]);

  const getWrapperRef = useCallback(
    (element: HTMLDivElement) => {
      const prevElement = wrapperRef.current;
      if (prevElement) {
        events.off(prevElement, "dxclick");
      }
      wrapperRef.current = element;
      events.on(element, "dxclick", () => {
        openMenu();
      });
    },
    [openMenu]
  );

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance();
    if (!treeView) {
      return;
    }

    if (pathname !== undefined) {
      treeView.selectItem(pathname);
      treeView.expandItem(pathname);
    }

    if (menuStatus === MenuStatus.Closed) {
      treeView.collapseAll();
    }
  }, [pathname, menuStatus, MenuStatus.Closed]);

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance();
    if (!treeView) {
      return;
    }

    if (menuStatus === MenuStatus.Opened) {
      treeView.expandAll();
    }
  }, [toggleMenu, menuStatus, MenuStatus.Opened]);

  return (
    <div className={"side-navigation-menu"} ref={getWrapperRef}>
      <div className={"menu-container"}>
        <TreeView
          ref={treeViewRef}
          items={items}
          keyExpr={"path"}
          expandedExpr="isExpanded"
          selectionMode={"single"}
          focusStateEnabled={false}
          expandEvent={"click"}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={"100%"}
        />
      </div>
    </div>
  );
}
