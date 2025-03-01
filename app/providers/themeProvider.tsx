"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { devextremeConfig } from "@/app-info";
import { currentTheme, refreshTheme } from "devextreme/viz/themes";
import { ThemeType, ThemeContextType } from "@/types";

const storageKey = "current_theme";
devextremeConfig();

function ThemeProvider({ children }: React.PropsWithChildren<unknown>) {
  const [theme, setTheme] = useState<ThemeType | null>(null);

  useEffect(() => {
    const storedTheme = window?.localStorage.getItem(storageKey) as ThemeType;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const mainElement = document.getElementById("root");

    if (theme) {
      const { link } = addStyleSheet(theme);
      const style = styles.find((item) => item.name === theme);
      window.localStorage.setItem(storageKey, theme);
      currentTheme(style.baseThemeName);
      refreshTheme();

      return () => {
        mainElement.removeChild(link);
      };
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
} as ThemeContextType);

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };

const styles = [
  {
    name: "light",
    baseThemeName: "fluent.blue.light",
    href: "/theme.lightmode.css",
  },
  {
    name: "dark",
    baseThemeName: "fluent.blue.dark",
    href: "/theme.darkmode.css",
  },
];

function addStyleSheet(theme: ThemeContextType["theme"]) {
  const mainElement = document.getElementById("root");
  const existingStyleElement = document.getElementById("style-link");
  if (existingStyleElement) {
    mainElement.removeChild(existingStyleElement);
  }

  const lightModeHref = styles[0].href;
  const darkModeHref = styles[1].href;

  const newStyle = theme === "light" ? lightModeHref : darkModeHref;

  const link = document.createElement("link");
  link.href = newStyle;
  link.rel = "stylesheet";
  link.id = "style-link";
  mainElement.appendChild(link);

  return { link };
}
