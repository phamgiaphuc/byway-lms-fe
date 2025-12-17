import { useGetChapters } from "@/hooks/tanstack-query/use-instructor";
import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import CourseAddChapter from "@/pages/instructor/course/course-add-chapter";
import CourseChapterItem from "@/pages/instructor/course/course-chapter-item";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { useWillUnmount } from "rooks";

const CourseChapterPage = () => {
  const { courseId } = useParams({
    from: "/_authenticated/instructor/course/$courseId/chapter",
  });
  const { data } = useGetChapters();
  const { updateFilter, resetFilter } = useFilterStore();

  useEffect(() => {
    updateFilter("chapter", {
      courseId: courseId,
    });
  }, []);

  useWillUnmount(() => resetFilter("chapter"));

  return (
    <div className="relative space-y-6 py-4">
      <div className="px-4">
        <div>
          <h1 className="text-2xl font-semibold">Course chapters</h1>
          <span className="text-muted-foreground">Create and manage your chapters here.</span>
        </div>
      </div>
      <div className="max-w-5xl space-y-4 px-4">
        <CourseAddChapter courseId={courseId} />
        {data && data.map((chapter) => <CourseChapterItem chapter={chapter} />)}
      </div>
    </div>
  );
};

export default CourseChapterPage;
