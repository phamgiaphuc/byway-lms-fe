import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import CourseDetailPage from "@/pages/public/course-detail-page";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useWillUnmount } from "rooks";

export const Route = createFileRoute("/_public/course/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { updateFilter, resetFilter } = useFilterStore();

  useEffect(() => {
    updateFilter("course", {
      id: id,
    });
  }, []);

  useWillUnmount(() => {
    resetFilter("course");
  });

  return <CourseDetailPage />;
}
