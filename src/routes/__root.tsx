import { Toaster } from "@/components/ui/sonner";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { getMe } from "@/services/user-service";
import { initialUser } from "@/types/user";
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

const RootLayout = () => {
  return (
    <>
      <HeadContent />
      <Outlet />
      <Toaster richColors position="top-center" theme="light" />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      const { data } = await queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: getMe,
      });
      if (data) {
        useUserStore.setState({
          profile: data,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      useUserStore.setState({
        profile: initialUser,
        isAuthenticated: false,
      });
    }
    return true;
  },
  component: RootLayout,
});
