import SignInPage from "@/pages/auth/sign-in-page";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/_auth/sign-in")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Sign in - Byway",
      },
    ],
  }),
});

function RouteComponent() {
  return <SignInPage />;
}
