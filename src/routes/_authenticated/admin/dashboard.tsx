import DashboardPage from "@/pages/admin/dashboard-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Dasboard - Admin",
      },
    ],
  }),
});

function RouteComponent() {
  return <DashboardPage />;
}
