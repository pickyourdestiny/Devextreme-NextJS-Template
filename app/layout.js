import "./globals.css";
import "../node_modules/devextreme/dist/css/dx.common.css";
import "../themes/generated/theme.base.css";
import "../themes/generated/theme.additional.css";
import "./dx-styles.scss";
import { Providers } from "./contexts/providers";

export const metadata = {
  title: "My Awesome App",
  description:
    "Using Devextreme Widgets for a professional looking and mobile-friendly App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={clientCSS}>
        <div id="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";

//this just gets rid of a warning message on the client about a css mismatch between the server and client.
//if you change the theme you can remove the className={clientCSS} above and just copy and paste the warning
//message on the client as it includes this css string, and then enable the className again.
const clientCSS =
  "dx-viewport dx-device-desktop dx-device-generic dx-theme-fluent dx-theme-fluent-typography dx-color-scheme-blue-light";
