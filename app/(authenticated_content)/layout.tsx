import { DrawerProvider } from "../providers/drawerProvider";
import Drawer from "../components/layout/drawer/drawer";
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
      <body suppressHydrationWarning className={"dx-viewport"}>
        <main id="root">
          <MainProviders>
            <div className="main-layout">
              <DrawerProvider>
                <div className="outer-toolbar">
                  <MainToolBar />
                </div>
                <div className="main-content">
                  <Drawer>{children}</Drawer>
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
