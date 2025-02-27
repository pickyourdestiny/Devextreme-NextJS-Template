"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMenuPatch } from "@/utils/patches";
import { DrawerContextType } from "@/types";

function DrawerProvider({ children }: React.PropsWithChildren<unknown>) {
  const [menuStatus, setMenuStatus] = useState<DrawerContextType["menuStatus"]>(
    MenuStatus.Closed
  );
  const { patchCssClass, onMenuReady } = useMenuPatch();
  const router = useRouter();
  const pathname = usePathname();

  const onNavigationChanged: DrawerContextType["onNavigationChanged"] =
    useCallback(
      (e) => {
        const { itemData, event, node } = e;
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
        setTimeout(() => {
          setMenuStatus(MenuStatus.Closed);
        });

        if (menuStatus === (MenuStatus.TemporaryOpened as unknown)) {
          setMenuStatus(MenuStatus.Closed);
          event.stopPropagation();
        }
      },
      [router, menuStatus, pathname, setMenuStatus]
    );

  const toggleMenu: DrawerContextType["toggleMenu"] = useCallback((e) => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.Opened
        : MenuStatus.Closed
    );
    e.event.stopPropagation();
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

  return (
    <DrawerContext.Provider
      value={{
        menuStatus,
        MenuStatus,
        patchCssClass,
        onMenuReady,
        temporaryOpenMenu,
        onNavigationChanged,
        onOutsideClick,
        toggleMenu,
        setMenuStatus,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3,
} as const;

const DrawerContext = createContext<DrawerContextType>({
  menuStatus: MenuStatus.Closed,
} as DrawerContextType);

const useDrawer = () => useContext(DrawerContext);

export { DrawerProvider, useDrawer };
