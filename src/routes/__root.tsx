import Footer from "@/components/footer";
import Header from "@/components/header";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import React from "react";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

const RootLayout = () => (
  <>
    <HeadContent />
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
