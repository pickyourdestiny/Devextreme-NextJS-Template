import "./home.scss";
import { checkSession } from "@/app/api/auth/customAuth";
import Title from "@/app/components/layout/title/title";
import AnimationWrapper from "../../components/layout/animation/animationWrapper";
import Link from "next/link";

export const metadata = {
  title: "Home Page",
  description: "Home page of my awesome Web App",
};

export default async function Home() {
  //const session= await checkSession();

  return (
    <AnimationWrapper>
      <Title text="Home" />
      <div className="content-block">
        <div className={"dx-card responsive-paddings"}>
          <p>
            Thank you for using this Devextreme App Template for NextJS. If you
            find it helpful please add a star to my github page.
          </p>
          <p>This template uses the following Devextreme Components:</p>
          <ul>
            <li>
              <Link
                href={
                  "https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Getting_Started_with_DataGrid/"
                }
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                DataGrid
              </Link>
            </li>
            <li>
              <Link
                href={
                  "https://js.devexpress.com/Documentation/Guide/Widgets/Form/Overview/"
                }
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                Form
              </Link>
            </li>
            <li>
              <Link
                href={
                  "https://js.devexpress.com/Documentation/Guide/Widgets/Drawer/Getting_Started_with_Navigation_Drawer/"
                }
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                Drawer
              </Link>
            </li>
            <li>
              <Link
                href={
                  "https://js.devexpress.com/Documentation/Guide/Widgets/Button/Getting_Started_with_Button/"
                }
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                Button
              </Link>
            </li>
            <li>
              <Link
                href={
                  "https://js.devexpress.com/Documentation/Guide/Widgets/Tooltip/Getting_Started_with_Tooltip/"
                }
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                ToolTip
              </Link>
            </li>
          </ul>

          <p>
            If you are not already familiar with NextJS it is best to visit
            their website and read their introductory documentation:
          </p>
          <ul>
            <li>
              <Link
                href={"https://nextjs.org/docs"}
                target={"_blank"}
                rel={"noopener noreferrer"}
              >
                NEXTJS and the APP ROUTER
              </Link>
            </li>
          </ul>
          <p>
            In order to add your own pages to this app, simply add another
            subfolder in the /app/(authenticated_content) directory with a
            similar structure as the /app/(authenticated_content)/profile and
            /app/(authenticated_content)/tasks folders. Each subfolder name
            automatically becomes a route (/profile and /tasks respectively) and
            the page.jsx file within becomes a server component. The
            (authenticated_content) subdirectory is ignored because it is a
            route group used for layout purposes only.
          </p>
          <p>
            You will notice that these pages contain client components found in
            the app/components directory. These client components contain the
            Devextreme Widgets and typically start with the directive &apos;use
            client&apos;
          </p>
          <p>
            After adding a new route in this manner modify the
            app/app-navigation.js file to add it to the navigation menu. You can
            also change the main title or footer in the app/app-info.js file,
            and enable a footer copyright message by setting
            footerInfo.copyRight to true.
          </p>
          <p>
            If you wish to add a custom toolbar item go to the
            /components/layout/mainToolbar.js file and add a Toolbar Item.
          </p>
          <p>
            Authentication includes complete signin and registration flows using
            Auth.js with the Google, Facebook, and Twitter social providers. You
            can sign in or register with credentials or a social account. The
            server component for Auth.js can be found in the root of the project
            in the auth.js file, and the custom server functions accompanying
            this boilerplate can be found in /app/api/customAuth.js
          </p>
          <p>
            NextJS uses a .env.local file to store your keys at the root of your
            application. Make sure you set the following keys:
          </p>
          <ul>
            <li className="keys">NEXT_PUBLIC_DEVEXTREME_LICENSE_KEY</li>
            <li className="keys">AUTH_GOOGLE_ID</li>
            <li className="keys">AUTH_GOOGLE_SECRET</li>
            <li className="keys">AUTH_FACEBOOK_ID</li>
            <li className="keys">AUTH_FACEBOOK_SECRET</li>
            <li className="keys">AUTH_TWITTER_ID</li>
            <li className="keys">AUTH_TWITTER_SECRET</li>
            <li className="keys">AUTH_TRUST_HOST=TRUE</li>
          </ul>
          <p>
            All the keys starting with &ldquo;AUTH&ldquo; are for Auth.js
            authentication, more information can be found on their website:
          </p>
          <a
            href="https://authjs.dev/getting-started/installation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Getting Started with AuthJS
          </a>

          <p>
            <span>
              For technical content related to DevExtreme React components, feel
              free to explore their{" "}
            </span>
            <a
              href="https://js.devexpress.com/documentation/"
              target="_blank"
              rel="noopener noreferrer"
            >
              online documentation
            </a>
            <span> and </span>
            <a
              href="https://js.devexpress.com/Demos/Widgetsgallery/"
              target="_blank"
              rel="noopener noreferrer"
            >
              technical demos
            </a>
          </p>
        </div>
      </div>
    </AnimationWrapper>
  );
}
