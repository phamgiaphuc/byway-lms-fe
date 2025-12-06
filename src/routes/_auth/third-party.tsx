import { useUserStore } from "@/hooks/zustand/use-user-store";
import { ls } from "@/lib/helpers";
import ThirdParty from "@/pages/auth/third-party";
import { getMe } from "@/services/user-service";
import { thirdPartySearchSchema } from "@/types/auth/verify";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/third-party")({
  validateSearch: thirdPartySearchSchema,
  beforeLoad: async ({ search, context: { queryClient } }) => {
    try {
      const { token } = search;
      if (token) {
        ls.set("token", token);
      }
      const { data } = await queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: getMe,
      });
      if (data) {
        useUserStore.setState({
          profile: data,
          isAuthenticated: true,
        });
      }
      return redirect({
        to: "/",
      });
    } catch (error) {
      console.log(error);
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <ThirdParty />;
}
