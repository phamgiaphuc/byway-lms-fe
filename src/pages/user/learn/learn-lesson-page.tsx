import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetCourseById } from "@/hooks/tanstack-query/use-course";
import { useGetLessonById, useGetLessons } from "@/hooks/tanstack-query/use-lesson";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, FilePlay, FileText } from "lucide-react";
import { useMemo } from "react";
import "./styles.css";
import { Separator } from "@/components/ui/separator";
import { useCompleteLesson, useGetMyLessons } from "@/hooks/tanstack-query/use-user";
import { toast } from "sonner";
import { HTTPError } from "ky";
import type { ApiError } from "@/types/api-error";

type LearnLessonPageProps = {
  courseId: string;
  lessonId: string;
};

const LearnLessonPage = (props: LearnLessonPageProps) => {
  const { lessonId, courseId } = props;
  const { data: course } = useGetCourseById();
  const { data: lesson } = useGetLessonById();
  const { data: chapters } = useGetLessons();
  const { data: userLessons } = useGetMyLessons();
  const { mutate } = useCompleteLesson(lessonId, courseId);
  const navigate = useNavigate();

  const flatLessons = useMemo(() => {
    return (chapters ?? []).flatMap((chapter) =>
      chapter.lessons.map((lesson) => ({
        ...lesson,
        chapterId: chapter.id,
      })),
    );
  }, [chapters]);

  const currentLessonIndex = useMemo(() => {
    return flatLessons.findIndex((l) => l.id === lessonId);
  }, [flatLessons, lessonId]);

  const prevLesson = currentLessonIndex > 0 ? flatLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < flatLessons.length - 1
      ? flatLessons[currentLessonIndex + 1]
      : null;

  const isLastLesson = !!lesson && !nextLesson;

  if (!(course && lesson && chapters)) {
    return <div>Course not found</div>;
  }

  const goToLesson = (lessonId: string) => {
    navigate({
      to: "/learn/$courseId/lesson/$lessonId",
      params: {
        courseId,
        lessonId,
      },
    });
  };

  const completeLesson = () => {
    mutate(undefined, {
      onSuccess: (resposne) => {
        toast.success(resposne.message);
      },
      onError: async (error) => {
        if (error instanceof HTTPError) {
          const { message } = await error.response.json<ApiError>();
          return toast.error(message);
        }
        toast.error(error.message);
      },
    });
  };

  return (
    <div className="relative container mx-auto min-h-[calc(100vh-20rem)] space-y-6 p-5">
      <div>
        <h1 className="text-2xl font-semibold">{lesson.title}</h1>
      </div>
      <div className="flex items-start gap-6">
        <div className="min-h-screen flex-1 space-y-6">
          <div className="overflow-hidden rounded-lg">
            {lesson.type === "video" && (
              <video className="w-full" controls key={lesson.id}>
                <source src={lesson.video.url} type="video/mp4"></source>
              </video>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: lesson.content }}
              className="quill-content bg-accent p-5"
            ></div>
          </div>
          <div className="flex items-center justify-between">
            <Button disabled={!prevLesson} onClick={() => prevLesson && goToLesson(prevLesson.id)}>
              <ChevronLeft />
              Prev lesson
            </Button>
            <Button
              onClick={() => {
                completeLesson();
                if (nextLesson) {
                  goToLesson(nextLesson.id);
                }
              }}
            >
              {isLastLesson ? (
                <>
                  Done
                  <Check />
                </>
              ) : (
                <>
                  Next lesson
                  <ChevronRight />
                </>
              )}
            </Button>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">Lesson Description</h2>
            <div
              className="quill-content leading-5"
              dangerouslySetInnerHTML={{ __html: lesson.description }}
            ></div>
          </div>
          <Separator />
          <div>
            <h2 className="mb-2 text-xl font-semibold">Course Description</h2>
            <div
              className="text-primary/75 text-justify leading-5"
              dangerouslySetInnerHTML={{ __html: course.description }}
            ></div>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">Certification</h2>
            <p className="text-primary/75 text-justify leading-5">
              At Byway, we understand the significance of formal recognition for your hard work and
              dedication to continuous learning. Upon successful completion of our courses, you will
              earn a prestigious certification that not only validates your expertise but also opens
              doors to new opportunities in your chosen field.
            </p>
          </div>
          <Separator />
          <div>
            <h2 className="mb-2 text-xl font-semibold">Insructor</h2>
            <div className="flex items-center gap-2">
              <img
                src={course.instructor.image}
                alt={course.instructor.name}
                className="size-10 rounded-full"
              />
              <p className="text-muted-foreground">
                Created by <span className="text-blue-600">{course.instructor.name}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="sticky top-20 w-full max-w-[400px] overflow-hidden rounded-lg border bg-[#F8FAFC] shadow-xs">
          <div className="px-6 pt-4 pb-2">
            <Label className="text-lg font-semibold">Course Completion</Label>
          </div>
          <Accordion type="multiple" defaultValue={[lesson.chapterId]}>
            {chapters.map((chapter) => (
              <AccordionItem value={chapter.id} key={chapter.id}>
                <AccordionTrigger className="border-b px-6 last:data-[state=closed]:border-none">
                  {chapter.title}
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  {chapter.lessons.map((lesson, index) => {
                    const isCompleted = userLessons?.find(
                      (userLesson) => userLesson.lessonId === lesson.id && userLesson.isCompleted,
                    );
                    return (
                      <Link
                        to="/learn/$courseId/lesson/$lessonId"
                        params={{
                          courseId: courseId,
                          lessonId: lesson.id,
                        }}
                        key={lesson.id}
                        className={cn(
                          "hover:bg-primary group flex cursor-pointer items-center justify-between gap-4 px-6 py-4 transition-colors hover:text-white",
                          lesson.id === lessonId && "bg-primary text-white",
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <Checkbox
                            className={cn(
                              "group-hover:border-inherit",
                              lesson.id === lessonId && "border-inherit",
                            )}
                            checked={!!isCompleted}
                          />
                          <span className="font-normal">
                            {index + 1}. {lesson.title}
                          </span>
                        </div>
                        {lesson.type === "lecture" ? (
                          <FileText className="size-4" />
                        ) : (
                          <FilePlay className="size-4" />
                        )}
                      </Link>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default LearnLessonPage;
