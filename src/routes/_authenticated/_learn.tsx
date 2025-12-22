import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_learn")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
