import CoursePage from "@/pages/public/course-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/course/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Course - Byway",
      },
    ],
  }),
});

function RouteComponent() {
  return <CoursePage />;
}
