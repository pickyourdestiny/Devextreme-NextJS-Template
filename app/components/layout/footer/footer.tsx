import { footerInfo } from "@/app-info";
import FooterLogo from "./footerLogo";
import "./footer.scss";

export default function Footer() {
  return (
    <div id="footer">
      <FooterLogo />
      {footerInfo.copyRight && (
        <div className="mt-4 mr-8 ml-8">©{new Date().getFullYear()}</div>
      )}

      {footerInfo.title && <div className="mt-4">{footerInfo.title}</div>}
    </div>
  );
}
