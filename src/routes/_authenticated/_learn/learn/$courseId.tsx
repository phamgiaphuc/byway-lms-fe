import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_learn/learn/$courseId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/_user/learn/$courseId"!</div>;
}
