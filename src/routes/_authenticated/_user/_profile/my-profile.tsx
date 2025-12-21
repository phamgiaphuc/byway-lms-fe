import MyProfilePage from "@/pages/user/my-profile-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_user/_profile/my-profile")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "My Profile - Byway",
      },
    ],
  }),
});

function RouteComponent() {
  return <MyProfilePage />;
}
