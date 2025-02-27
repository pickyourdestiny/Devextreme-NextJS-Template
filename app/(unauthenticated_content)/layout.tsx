import Footer from "../components/layout/footer/footer";
import { MainProviders } from "../contexts/mainProviders";
import "../globals.css";
import "../../themes/generated/theme.lightmode.css";
import "../dx-styles.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head id="main-head"></head>
      <body className={clientCSS}>
        <div id="root">
          <MainProviders>
            <div className="main-layout">
              <div className="main-content">
                <div className="unauth-overflow">
                  <div className={"dx-card unauth content"}>{children}</div>
                </div>
              </div>
              <Footer />
            </div>
          </MainProviders>
        </div>
      </body>
    </html>
  );
}

const clientCSS =
  "dx-viewport dx-device-desktop dx-device-generic dx-theme-fluent dx-theme-fluent-typography dx-color-scheme-blue-light";
