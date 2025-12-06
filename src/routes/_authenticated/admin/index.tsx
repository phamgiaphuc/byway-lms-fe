import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/")({
  beforeLoad: () => {
    return redirect({
      to: "/admin/dashboard",
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/admin/"!</div>;
}
