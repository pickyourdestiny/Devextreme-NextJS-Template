"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import TreeView from "devextreme-react/tree-view";
import { navigation } from "@/app/app-navigation";
import { useScreenSize } from "../utils/media-query";
import "./sideNavigationMenu.scss";
import { usePathname } from "next/navigation";

import * as events from "devextreme/events";

export default function SideNavigationMenu(props) {
  const { children, selectedItemChanged, openMenu, compactMode, onMenuReady } =
    props;

  const { isLarge } = useScreenSize();
  const pathname = usePathname();

  const normalizePath = useCallback(() => {
    let navMenu;

    navMenu = navigation;

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

  const treeViewRef = useRef(null);
  const wrapperRef = useRef();
  const getWrapperRef = useCallback(
    (element) => {
      const prevElement = wrapperRef.current;
      if (prevElement) {
        events.off(prevElement, "dxclick");
      }

      wrapperRef.current = element;
      events.on(element, "dxclick", (e) => {
        openMenu(e);
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

    if (compactMode) {
      treeView.collapseAll();
    }
  }, [pathname, compactMode]);

  return (
    <div
      className={"dx-swatch-additional side-navigation-menu"}
      ref={getWrapperRef}
    >
      {children}
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
