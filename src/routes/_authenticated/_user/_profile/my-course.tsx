import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_user/_profile/my-course")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "My Course - Byway",
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/_authenticated/_user/course"!</div>;
}
