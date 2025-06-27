import React, { useCallback, useMemo } from "react";
import { useTheme } from "@/app/providers/themeProvider";
import { motion } from "motion/react";
import Image from "next/image";
import moon from "../../../../assets/logos/moon.svg";
import sun from "../../../../assets/logos/sun.svg";
import styles from "./themeSwitch.module.scss";
import { Tooltip } from "devextreme-react/tooltip";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const { baseBgDark } = styles;

  const changeTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }, [setTheme, theme]);

  const container = useMemo(() => {
    return {
      width: 50,
      height: 30,
      border: "none",
      borderRadius: 50,
      cursor: "pointer",
      display: "flex",
      padding: 2,
      backgroundColor: "whitesmoke",
    };
  }, []);

  const handle = useMemo(() => {
    return {
      width: 26,
      height: "auto",
      borderRadius: "50%",
      backgroundColor: theme === "light" ? "lightgrey" : baseBgDark,
    };
  }, [theme, baseBgDark]);

  return (
    <>
      <button
        id="toggle-theme-button"
        className={"mr-10 ml-10"}
        style={{
          ...container,
          justifyContent: "flex-" + (theme === "light" ? "start" : "end"),
        }}
        onClick={changeTheme}
      >
        <motion.div
          style={handle}
          layout
          transition={{
            type: "spring",
            visualDuration: 0.3,
            bounce: 0.2,
          }}
        >
          <Image
            src={theme === "light" ? sun : moon}
            alt=""
            height={25}
            width={25}
          />
        </motion.div>
      </button>
      <Tooltip
        target="#toggle-theme-button"
        showEvent="mouseenter"
        hideEvent="mouseleave"
        hideOnOutsideClick={false}
        position={positionOffset}
      >
        <div>Light Mode / Dark Mode</div>
      </Tooltip>
    </>
  );
}

const positionOffset = { offset: { y: +10 } };
