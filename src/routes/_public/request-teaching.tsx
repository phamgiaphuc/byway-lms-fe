import RequestTeachingPage from "@/pages/user/request-teaching-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/request-teaching")({
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
