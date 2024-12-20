import myLogo from "../public/next.svg";
import devExtreme from "../public/devextreme.png";
import Config from "devextreme/core/config";

export const footerInfo = {
  title: "Build Your Dream App",
  logo: myLogo,
  copyRight: false,
};

export const headerInfo = {
  title: "DevExtreme & NextJS",
  logo: devExtreme,
};

export const devextremeConfig = () =>
  Config({
    licenseKey: process.env.NEXT_PUBLIC_DEVEXTREME_LICENSE_KEY,
    // editorStylingMode: "underlined", // or 'outlined' | 'underlined for form editors'
  });
