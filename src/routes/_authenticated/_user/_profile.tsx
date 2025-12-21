import UserSidebar from "@/components/user/user-sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_user/_profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-20rem)] space-x-6 p-5">
      <UserSidebar />
      <Outlet />
    </div>
  );
}
