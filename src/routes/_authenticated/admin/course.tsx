import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import CoursePage from "@/pages/admin/course-page";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/admin/course")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Courses - Admin",
      },
    ],
  }),
});

function RouteComponent() {
  const { setHeaders } = useSidebarStore();

  useEffect(() => {
    setHeaders([
      {
        title: "Dashboard",
        url: "/admin/dashboard",
      },
      {
        title: "Course",
      },
    ]);
  }, []);

  return <CoursePage />;
}
