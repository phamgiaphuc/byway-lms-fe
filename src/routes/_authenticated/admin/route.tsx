import { AdminSidebar } from "@/components/sidebar/admin-sidebar";
import NavBreadcrumbs from "@/components/sidebar/nav-breadcrumbs";
import {
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { ADMIN_ROLE } from "@/types/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: () => {
    const { profile } = useUserStore.getState();
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
        <header className="bg-background border-border sticky top-0 z-50 flex h-14 items-center border-b px-4">
          <SidebarTrigger variant="outline" className="size-8" />
          <SidebarSeparator orientation="vertical" className="max-h-5" />
          <NavBreadcrumbs />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
