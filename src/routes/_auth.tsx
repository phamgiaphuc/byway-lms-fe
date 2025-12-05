import { useUserStore } from "@/hooks/zustand/use-user-store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    const { isAuthenticated } = useUserStore.getState();
    if (isAuthenticated) {
      return redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
