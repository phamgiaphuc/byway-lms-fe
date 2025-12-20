import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_user/_profile/my-request")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "My Request - Byway",
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/_authenticated/_user/request"!</div>;
}
