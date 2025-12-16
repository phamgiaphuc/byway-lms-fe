import CourseDetailPage from "@/pages/instructor/course/course-detail-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/instructor/course/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CourseDetailPage />;
}
