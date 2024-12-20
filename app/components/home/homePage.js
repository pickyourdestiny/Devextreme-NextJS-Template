"use client";

import React from "react";
import BuyMeACoffeeButton from "./buyMeACoffee";
import Link from "next/link";
import { ScrollView } from "devextreme-react";
import { useScreenSize } from "../utils/media-query";
import "./homePage.scss";

export default function HomePage() {
  const { isXSmall } = useScreenSize();

  return (
    <>
      <div className={"content-block"}>
        {!isXSmall && <h2>Home</h2>}
        <ScrollView id="home-page-scroll">
          <div className={"dx-card responsive-paddings"}>
            <p>
              Thank you for using this Devextreme App Template for NextJS. I did
              spend some time rebuilding this template so if you like it and
              find it useful please add a star to my github page
            </p>
            <p>And I always appreciate a coffee</p>
            <div>
              <BuyMeACoffeeButton />
            </div>
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
                    "https://js.devexpress.com/React/Documentation/Guide/UI_Components/ScrollView/Overview/"
                  }
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                >
                  ScrollView
                </Link>
              </li>
            </ul>

            <p>
              If you are not already familiar with NextJS I highly recommend you
              visit their website and read their introductory documentation
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
              automatically becomes a route (/profile and /tasks respectively)
              and the page.jsx file within becomes a server component. The
              (authenticated_content) subdirectory is ignored because it is a
              route group used for layout purposes only.
            </p>
            <p>
              You will notice that these pages contain client components found
              in the app/components directory. These client components contain
              the Devextreme Widgets and start with the directive &apos;use
              client&apos;
            </p>
            <p>
              After adding a new route in this manner simply modify the
              app/app-navigation.js file to add it to the navigation menu. You
              can also change the main title or footer in the app/app-info.js
              file, and enable a footer copyright message automatically by
              setting footerInfo.copyRight to true. Here you can also set each
              logo to null and/or titles to an empty string &quot;&quot; to
              exclude any part of the header or footer
            </p>
            <p>
              If you wish to add a custom toolbar item go to the
              /components/layout/mainToolbar.js file and add a Toolbar Item. You
              can use the tasks button as an example
            </p>
            <p>
              If you want to change the base theme or customize styling a
              readme.txt file is available in the /themes directory which
              provides step-by-step instructions
            </p>
            <p>
              I also added a complete login and registration boilerplate using
              Auth.js with the Google, Facebook, and Twitter social logins. You
              can login or register with credentials or a social account. The
              server component for Auth.js can be found in the root of the
              project in the auth.js file, and the custom server functions
              accompanying this boilerplate can be found in
              /app/api/customAuth.js
            </p>
            <p>
              NextJS uses a .env.local file to store your keys at the root of
              your app. Make sure you set the following keys:
            </p>
            <ul>
              <li className="keys">NEXT_PUBLIC_DEVEXTREME_LICENSE_KEY</li>
              <li className="keys">AUTH_SECRET</li>
              <li className="keys">AUTH_GOOGLE_CLIENT_ID</li>
              <li className="keys">AUTH_GOOGLE_CLIENT_SECRET</li>
              <li className="keys">AUTH_FACEBOOK_CLIENT_ID</li>
              <li className="keys">AUTH_FACEBOOK_CLIENT_SECRET</li>
              <li className="keys">AUTH_TWITTER_CLIENT_ID</li>
              <li className="keys">AUTH_TWITTER_CLIENT_SECRET</li>
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
                For technical content related to DevExtreme React components,
                feel free to explore their{" "}
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
        </ScrollView>
      </div>
    </>
  );
}
