import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useGetChapters } from "@/hooks/tanstack-query/use-instructor";
import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import { cn } from "@/lib/utils";
import CourseAddChapter from "@/pages/instructor/course/course-add-chapter";
import CourseUpdateChapter from "@/pages/instructor/course/course-update-chapter";
import { useParams } from "@tanstack/react-router";
import { ChevronDown, GripVertical, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useWillUnmount } from "rooks";

const CourseChapterPage = () => {
  const { id } = useParams({
    from: "/_authenticated/instructor/course/$id/chapter",
  });
  const { data } = useGetChapters();
  const { updateFilter, resetFilter } = useFilterStore();

  useEffect(() => {
    updateFilter("chapter", {
      courseId: id,
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
        <CourseAddChapter courseId={id} />
        {data &&
          data.map((chapter) => (
            <div
              key={chapter.id}
              className="group border-input bg-card hover:border-primary/50 hover:bg-accent/25 flex h-16 items-center gap-4 rounded-lg border px-4 shadow-xs transition-all duration-200"
            >
              <div className="flex gap-2">
                <Button variant="ghost" size="icon-sm">
                  <GripVertical />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <ChevronDown />
                </Button>
              </div>
              <div className="flex flex-1 items-center justify-between">
                <Label className="text-foreground font-semibold">{chapter.title}</Label>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <CourseUpdateChapter chapter={chapter} />
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                  <Badge className={cn(chapter.isPublished ? "bg-blue-500" : "bg-yellow-500")}>
                    {chapter.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CourseChapterPage;
