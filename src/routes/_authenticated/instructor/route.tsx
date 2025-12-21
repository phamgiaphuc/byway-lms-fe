import { InstructorSidebar } from "@/components/sidebar/instructor-sidebar";
import NavBreadcrumbs from "@/components/sidebar/nav-breadcrumbs";
import {
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { INSTRUCTOR_ROLE } from "@/types/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/instructor")({
  beforeLoad: () => {
    const { profile } = useUserStore.getState();
    if (profile.role !== INSTRUCTOR_ROLE) {
      throw redirect({
        to: "/",
      });
    }
    redirect({
      to: "/instructor/dashboard",
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { isHeaderHidden } = useSidebarStore();

  return (
    <SidebarProvider>
      <InstructorSidebar />
      <SidebarInset>
        {!isHeaderHidden && (
          <header className="bg-background border-border sticky top-0 flex h-14 items-center border-b px-2">
            <SidebarTrigger className="size-8" />
            <SidebarSeparator orientation="vertical" className="ml-2 max-h-4" />
            <NavBreadcrumbs />
          </header>
        )}
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
