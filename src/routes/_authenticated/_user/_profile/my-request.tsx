import { useGetMyRequests } from "@/hooks/tanstack-query/use-user";
import MyRequestPage from "@/pages/user/my-request-page";
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
  const { data } = useGetMyRequests();

  return data && <MyRequestPage requests={data} />;
}
