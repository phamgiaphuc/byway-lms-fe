import { useUserStore } from "@/hooks/zustand/use-user-store";
import VerifyPage from "@/pages/auth/verify-page";
import { verifySearchSchema } from "@/types/auth/verify";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/verify")({
  validateSearch: verifySearchSchema,
  component: RouteComponent,
  beforeLoad: () => {
    const { profile } = useUserStore.getState();
    if (!profile.id) {
      return redirect({
        to: "/",
      });
    }
  },
  head: () => ({
    meta: [
      {
        title: "Verify - Byway",
      },
    ],
  }),
});

function RouteComponent() {
  return <VerifyPage />;
}
