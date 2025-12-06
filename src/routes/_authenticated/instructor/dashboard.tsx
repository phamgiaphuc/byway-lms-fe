import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/instructor/dashboard")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Dashboard - Instructor",
      },
    ],
  }),
});

function RouteComponent() {
  const { setHeaders } = useSidebarStore();

  useEffect(() => {
    setHeaders([
      {
        title: "Dashboard",
      },
    ]);
  }, []);

  return <div className="px-5">Hello "/_authenticated/instructor/dashboard"!</div>;
}
