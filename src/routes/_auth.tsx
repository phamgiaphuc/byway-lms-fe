import Header from "@/components/header";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    const { isAuthenticated, profile } = useUserStore.getState();
    if (!isAuthenticated) {
      return true;
    }
    if (profile.role === "admin") {
      return redirect({
        to: "/admin/dashboard",
      });
    }
    if (profile.role === "instructor") {
      return redirect({
        to: "/instructor/dashboard",
      });
    }
    return redirect({
      to: "/",
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <>
      <Header queryClient={queryClient} />
      <Outlet />
    </>
  );
}
