import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_user/course")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/_user/course"!</div>;
}
