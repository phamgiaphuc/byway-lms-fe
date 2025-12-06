import { AdminSidebar } from "@/components/sidebar/admin-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { ADMIN_ROLE } from "@/types/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: () => {
    const { profile } = useUserStore.getState();
    console.log(profile);
    if (profile.role !== ADMIN_ROLE) {
      throw redirect({
        to: "/",
      });
    }
    redirect({
      to: "/admin/dashboard",
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center px-2">
          <SidebarTrigger />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
