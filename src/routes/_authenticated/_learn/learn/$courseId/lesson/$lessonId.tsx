import Footer from "@/components/footer";
import LearnHeader from "@/components/learn-header";
import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import LearnCoursePage from "@/pages/user/learn/learn-lesson-page";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect } from "react";
import { useWillUnmount } from "rooks";

export const Route = createFileRoute("/_authenticated/_learn/learn/$courseId/lesson/$lessonId")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Learn course - Byway",
      },
    ],
  }),
});

function RouteComponent() {
  const { courseId, lessonId } = Route.useParams();
  const { updateFilter, resetFilter } = useFilterStore();

  useEffect(() => {
    updateFilter("course", {
      id: courseId,
      detail: false,
    });
    updateFilter("lesson", {
      id: lessonId,
    });
  }, [lessonId, courseId]);

  useWillUnmount(() => {
    resetFilter("course");
    resetFilter("lesson");
  });

  return (
    <React.Fragment>
      <LearnHeader />
      <LearnCoursePage courseId={courseId} lessonId={lessonId} />
      <Footer />
    </React.Fragment>
  );
}
