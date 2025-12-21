import type { Chapter } from "@/types/chapter";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight, FilePlay, FileText, Pencil, Plus } from "lucide-react";
import CourseUpdateChapter from "@/pages/instructor/course/course-update-chapter";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import CourseDeleteChapter from "@/pages/instructor/course/course-delete-chapter";
import LessonDeleteChapter from "@/pages/instructor/course/lesson/lesson-delete-chapter";

type CourseChapterItemProps = {
  chapter: Chapter;
};

const CourseChapterItem = ({ chapter }: CourseChapterItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <div className="group border-input bg-card hover:border-primary/50 hover:bg-accent/25 flex h-14 items-center gap-4 rounded-lg border px-4 shadow-xs transition-all duration-200">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon-sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronDown /> : <ChevronRight />}
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <Label className="text-foreground font-semibold">{chapter.title}</Label>
          <div className="flex items-center gap-4">
            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <CourseUpdateChapter chapter={chapter} />
              <CourseDeleteChapter chapter={chapter} />
            </div>
            <Badge className={cn(chapter.isPublished ? "bg-blue-600" : "bg-yellow-500")}>
              {chapter.isPublished ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "ml-13 overflow-hidden transition-all duration-300 ease-out",
          isExpanded ? "max-h-[2000px] pt-2 opacity-100" : "max-h-0 pt-0 opacity-0",
        )}
      >
        {chapter.lessons.map((lesson) => (
          <div key={lesson.id} className="group relative flex items-center">
            <div className="relative h-12 w-6 shrink-0">
              <div className="bg-tree-connector absolute -top-6 left-0 h-full w-0.5" />
              <div className="bg-tree-connector absolute top-6 left-0 h-0.5 w-6" />
            </div>
            <div className="bg-card/50 hover:border-input hover:bg-card flex h-12 flex-1 items-center gap-3 rounded-lg border border-transparent px-4 transition-all duration-200 ease-out hover:shadow-xs">
              <div className="flex items-center gap-2">
                {lesson.type === "lecture" ? (
                  <FileText className="text-primary size-4" />
                ) : (
                  <FilePlay className="text-primary size-4" />
                )}
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="text-foreground truncate font-medium">{lesson.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <Button variant="ghost" size="icon-sm">
                      <Pencil />
                    </Button>
                    <LessonDeleteChapter lesson={lesson} />
                  </div>
                  <Badge
                    className={cn(
                      lesson.isPublished
                        ? "bg-background border border-green-600 text-green-600"
                        : "bg-background border-primary text-primary border",
                    )}
                  >
                    {lesson.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="group relative flex items-center">
          <div className="relative h-12 w-6 shrink-0">
            <div className="bg-tree-connector absolute -top-6 left-0 h-full w-0.5" />
            <div className="bg-tree-connector absolute top-6 left-0 h-0.5 w-6" />
          </div>
          <Button variant="ghost" asChild>
            <Link
              to="/instructor/lesson/add-new"
              search={{
                chapterId: chapter.id,
              }}
            >
              <Plus className="ml-1" />
              Add a lesson
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseChapterItem;
