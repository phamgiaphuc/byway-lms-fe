import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import CoursePage from "@/pages/instructor/course/course-page";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/instructor/course/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Course - Instructor",
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
        url: "/instructor/dashboard",
      },
      {
        title: "Course",
      },
    ]);
  }, []);

  return <CoursePage />;
}
