import { useGetCourseById } from "@/hooks/tanstack-query/use-instructor";
import CourseSettingsPage from "@/pages/instructor/course/settings/course-settings-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/instructor/course/$courseId/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useGetCourseById();

  return data && <CourseSettingsPage course={data} />;
}
