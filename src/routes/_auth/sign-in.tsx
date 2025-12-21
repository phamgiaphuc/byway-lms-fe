import SignInPage from "@/pages/auth/sign-in-page";
import { signInSearchSchema } from "@/types/auth/sign-in";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/sign-in")({
  validateSearch: signInSearchSchema,
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
