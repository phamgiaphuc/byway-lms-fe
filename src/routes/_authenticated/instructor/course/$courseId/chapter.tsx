import CourseChapterPage from "@/pages/instructor/course/course-chapter-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/instructor/course/$courseId/chapter")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CourseChapterPage />;
}
