import { DrawerProvider } from "../providers/drawerProvider";
import DrawerContent from "../components/layout/drawer/drawer";
import MainToolBar from "../components/layout/toolbar/mainToolbar";
import { MainProviders } from "../contexts/mainProviders";
import Footer from "../components/layout/footer/footer";
import AnimationWrapper from "../components/layout/animation/animationWrapper";
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
        <main id="root">
          <MainProviders>
            <div className="main-layout">
              <DrawerProvider>
                <div className="outer-toolbar">
                  <MainToolBar />
                </div>
                <div className="main-content">
                  <DrawerContent>{children}</DrawerContent>
                </div>
              </DrawerProvider>
              <AnimationWrapper>
                <Footer />
              </AnimationWrapper>
            </div>
          </MainProviders>
        </main>
      </body>
    </html>
  );
}

const clientCSS =
  "dx-viewport dx-device-desktop dx-device-generic dx-theme-fluent dx-theme-fluent-typography dx-color-scheme-blue-light";
