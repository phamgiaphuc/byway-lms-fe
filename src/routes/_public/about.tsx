import ProfilePage from "@/pages/admin/profile-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/about")({
  component: About,
});

function About() {
  return <ProfilePage/>;
}
