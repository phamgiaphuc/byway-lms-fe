import Footer from "@/components/footer";
import Header from "@/components/header";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { getMe } from "@/services/user-service";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet } from "@tanstack/react-router";
import React from "react";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/react-router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

const ReactQueryDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/react-query-devtools").then((res) => ({
        default: res.ReactQueryDevtools,
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
    <ReactQueryDevtools />
  </>
);

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: async () => {
    const { data } = await getMe();
    if (data) {
      useUserStore.setState({
        profile: data,
        isAuthenticated: true,
      });
    }
    return true;
  },
  component: RootLayout,
});
