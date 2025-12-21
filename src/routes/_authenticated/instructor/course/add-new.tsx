import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import CourseAddNewPage from "@/pages/instructor/course/course-add-new-page";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useWillUnmount } from "rooks";

export const Route = createFileRoute("/_authenticated/instructor/course/add-new")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Add new course",
      },
    ],
  }),
});

function RouteComponent() {
  const { setIsHeaderHidden } = useSidebarStore();

  useEffect(() => {
    setIsHeaderHidden(true);
  }, []);

  useWillUnmount(() => setIsHeaderHidden(false));

  return <CourseAddNewPage />;
}
