import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import CourseDetailPage from "@/pages/public/course-detail-page";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useWillUnmount } from "rooks";

export const Route = createFileRoute("/_public/course/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const { updateFilter, resetFilter } = useFilterStore();

  useEffect(() => {
    updateFilter("course", {
      id: id,
      detail: true,
    });
  }, []);

  useWillUnmount(() => {
    resetFilter("course");
    queryClient.invalidateQueries({
      queryKey: ["me", "courses"],
    });
  });

  return <CourseDetailPage />;
}
