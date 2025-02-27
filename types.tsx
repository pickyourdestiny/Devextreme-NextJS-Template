import React from "react";
import { ToolbarRef } from "devextreme-react/toolbar";
import { TreeViewTypes } from "devextreme-react/tree-view";
import { ButtonTypes } from "devextreme-react/button";

export interface AnimationProps {
  children: React.ReactNode;
  duration?: number;
  slideX?: boolean;
  slideY?: boolean;
}

export interface ProviderType {
  id?: string;
  name?: string;
}

export interface ProviderButtonProps {
  provider: ProviderType;
  action: "Login" | "Register";
  redirectPath: string;
}

export interface TitleProps {
  text: string;
}

export interface RecoveryCodeType {
  recoveryCode: string;
}

export interface SearchParamsType {
  [key: string]: string | string[] | undefined;
}

export interface ToolBarRefType {
  toolBarRef: React.RefObject<ToolbarRef>;
}

export interface ProfileType {
  userProfile: {
    id: number;
    notes: string;
    picture: string;
    prefix: string;
    firstName: string;
    lastName: string;
    position: string;
    birthDate: Date;
    hireDate: Date;
    address: string;
  };
}

export type ThemeType = "light" | "dark";

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
}

export interface MenuStatusType {
  Closed: 1;
  Opened: 2;
  TemporaryOpened: 3;
}

export type DrawerContextType = {
  menuStatus: MenuStatusValues;
  MenuStatus: typeof MenuStatus;
  temporaryOpenMenu: () => void;
  patchCssClass: string;
  onMenuReady: (e: TreeViewTypes.ContentReadyEvent) => void;
  onNavigationChanged: (e: TreeViewTypes.ItemClickEvent) => void;
  onOutsideClick: () => true;
  toggleMenu: (e: ButtonTypes.ClickEvent) => void;
  setMenuStatus: React.Dispatch<React.SetStateAction<MenuStatusValues>>;
};

const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3,
} as const;

type MenuStatusKeys = keyof typeof MenuStatus;

type MenuStatusValues = (typeof MenuStatus)[MenuStatusKeys];

export type MediaEventListenerCallback = ({
  media,
  matches,
}: {
  media: string;
  matches: boolean;
}) => void;

export interface CredentialsType {
  email: string;
  password: string;
  callbackURL?: string;
}

export interface UserParams {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  loginMethod?: string;
}

export interface AccountParams {
  provider?: string;
  type?: string;
  providerAccountId?: string;
}
