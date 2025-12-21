import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import DashboardPage from "@/pages/instructor/dashboard/dashboard-page";
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

  return <DashboardPage />;
}
