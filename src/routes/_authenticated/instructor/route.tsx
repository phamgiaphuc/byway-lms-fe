import { InstructorSidebar } from "@/components/sidebar/instructor-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { INSTRUCTOR_ROLE } from "@/types/user";
import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/instructor")({
  beforeLoad: () => {
    const { profile } = useUserStore.getState();
    if (profile.role !== INSTRUCTOR_ROLE) {
      redirect({
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
  const { headers } = useSidebarStore();

  return (
    <SidebarProvider>
      <InstructorSidebar />
      <SidebarInset>
        <header className="bg-background border-border sticky top-0 flex h-14 items-center border-b px-2">
          <SidebarTrigger />
          <div className="ml-2">
            <Breadcrumb>
              <BreadcrumbList>
                {headers.map((header) => {
                  if (header.url) {
                    return (
                      <BreadcrumbItem key={header.title}>
                        <BreadcrumbLink asChild>
                          <Link to={header.url}>{header.title}</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    );
                  }
                  return (
                    <BreadcrumbItem key={header.title}>
                      <BreadcrumbPage>{header.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
