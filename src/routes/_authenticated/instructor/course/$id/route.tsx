import CourseDetailHeader from "@/components/instructor/course-detail-header";
import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useWillUnmount } from "rooks";

export const Route = createFileRoute("/_authenticated/instructor/course/$id")({
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
  const { id } = Route.useParams();
  const { setIsHeaderHidden } = useSidebarStore();
  const { updateFilter } = useFilterStore();

  useEffect(() => {
    setIsHeaderHidden(true);
    updateFilter("course", { id: id });
  }, []);

  useWillUnmount(() => setIsHeaderHidden(false));

  return (
    <>
      <CourseDetailHeader />
      <Outlet />
    </>
  );
}
