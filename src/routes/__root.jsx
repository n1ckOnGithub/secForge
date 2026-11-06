import appCss from "../../style.css?url";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

const RootLayout = () => (
  <>
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <SiteHeader />
        <Outlet />
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  </>
);

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootLayout,
});
