import nextLogoWhite from "./app/assets/logos/next-white.png";
import nextLogoBlack from "./app/assets/logos/next-black.svg";
import devextremeLogo from "./app/assets/logos/devextreme.svg";
import Config from "devextreme/core/config";

const nextLogos = {
  white: nextLogoWhite,
  black: nextLogoBlack,
};

export const footerInfo = {
  title: "Build Your Dream App",
  logo: nextLogos,
  copyRight: true,
};

export const headerInfo = {
  title: "DevExtreme & NextJS",
  logo: devextremeLogo,
};

export const devextremeConfig = () =>
  Config({
    licenseKey: process.env.NEXT_PUBLIC_DEVEXTREME_LICENSE_KEY,
    // editorStylingMode: "underlined", // or 'outlined' | 'underlined for form editors'
  });
