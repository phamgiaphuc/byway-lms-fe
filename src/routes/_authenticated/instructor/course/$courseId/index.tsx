import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/instructor/course/$courseId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>ABC</div>;
}
