import ProfilePage from "@/pages/auth/profile-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/about")({
  component: About,
});

function About() {
  return <p>Welcome to /about</p>;
}
