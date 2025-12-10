import { useUserStore } from "@/hooks/zustand/use-user-store";
import RequestTeachingPage from "@/pages/user/request-teaching-page";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_user/request-teaching")({
  beforeLoad: () => {
    const { profile } = useUserStore.getState();
    if (profile.role === "user") {
      return true;
    }
    return redirect({
      to: "/",
    });
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Request Teaching - Byway",
      },
    ],
  }),
});

function RouteComponent() {
  return <RequestTeachingPage />;
}
