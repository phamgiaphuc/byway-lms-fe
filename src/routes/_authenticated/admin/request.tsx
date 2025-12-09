import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/request")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/admin/requests"!</div>;
}
