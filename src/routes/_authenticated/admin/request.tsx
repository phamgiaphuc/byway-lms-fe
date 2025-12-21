import RequestPage from "@/pages/admin/request/request-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/request")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Request - Admin",
      },
    ],
  }),
});

function RouteComponent() {
  return <RequestPage />;
}
