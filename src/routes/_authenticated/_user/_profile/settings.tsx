import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_user/_profile/settings")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Course - Byway",
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/_authenticated/_user/settings"!</div>;
}
