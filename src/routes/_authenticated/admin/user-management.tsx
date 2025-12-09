import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/user-management")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/admin/users"!</div>;
}
