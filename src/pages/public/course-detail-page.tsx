import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetCourseById } from "@/hooks/tanstack-query/use-course";
import { useGetMyCourses, userUserEnrollCourse } from "@/hooks/tanstack-query/use-user";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { env } from "@/lib/env";
import type { ApiError } from "@/types/api-error";
import { Link, useNavigate } from "@tanstack/react-router";
import { HTTPError } from "ky";
import { FilePlay, FileText, Loader2, Star } from "lucide-react";
import { useMemo } from "react";
import { useDocumentTitle } from "rooks";
import { toast } from "sonner";

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useUserStore();
  const { data, isLoading } = useGetCourseById();
  const { mutate } = userUserEnrollCourse();
  const { data: courses } = useGetMyCourses();

  const totalChapters = useMemo(() => data?.chapters.length, [data]);
  const totalLessons = useMemo(
    () => data?.chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0),
    [data],
  );

  const isAlreadyEnrolled = useMemo(() => {
    if (!courses) {
      return false;
    }
    return courses.find((course) => course.courseId === data?.id);
  }, [courses, data]);

  useDocumentTitle(data?.title || "Course - Byway");

  const onEnroll = () => {
    if (!isAuthenticated) {
      navigate({
        to: "/sign-in",
        search: {
          redirectUrl: `${env.VITE_APP_URL}/course/${data?.id}`,
        },
      });
      return;
    }
    if (isAlreadyEnrolled) {
      navigate({
        to: "/learn/$courseId/lesson/$lessonId",
        params: {
          courseId: data?.id || "",
          lessonId: data?.chapters[0].lessons[0].id || "",
        },
      });
      return;
    }
    mutate(data?.id || "", {
      onSuccess: (response) => {
        toast.success(response.message);
        navigate({
          to: "/learn/$courseId/lesson/$lessonId",
          params: {
            courseId: data?.id || "",
            lessonId: data?.chapters[0].lessons[0].id || "",
          },
        });
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

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-20rem)] items-center justify-center">
        <div className="flex items-center gap-4 py-4">
          <Loader2 className="size-8 animate-spin" />
          <span className="text-sm">Course is loading, please wait a little bit...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-20rem)]">
      <div className="bg-[#F8FAFC]">
        <div className="relative container mx-auto flex flex-col gap-10 px-5 pt-10 pb-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/course">Courses</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-col gap-6 xl:max-w-[700px] 2xl:max-w-[950px]">
            <div className="flex flex-col gap-4">
              <h1 className="line-clamp-3 text-4xl font-bold">{data?.title}</h1>
              <p className="text-muted-foreground text-justify leading-5">{data?.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                <Star className="size-5 fill-yellow-500 stroke-yellow-500" />
                <Star className="size-5 stroke-yellow-500" />
              </div>
              <div className="bg-primary h-5 w-0.5"></div>
              <span className="capitalize">
                {totalChapters} Chapters, {totalLessons} Lessons, {data?.level}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src={data?.instructor.image}
                alt={data?.instructor.name}
                className="size-10 rounded-full"
              />
              <p className="text-muted-foreground">
                Created by <span className="text-blue-600">{data?.instructor.name}</span>
              </p>
            </div>
          </div>
          <Card className="absolute right-20 w-full max-w-[400px] shadow-lg">
            <CardContent className="flex flex-col gap-4">
              <img
                src={data?.image.url}
                alt={data?.image.name}
                className="h-48 w-full rounded-lg object-cover"
              />

              <div className="flex items-end justify-between gap-2">
                <span className="text-2xl font-bold">
                  {data?.price === 0 ? "Free" : `$${data?.price}`}
                </span>
              </div>
              <Button onClick={onEnroll} disabled={profile.role !== "user"}>
                {isAlreadyEnrolled ? "Learn now" : "Enroll now"}
              </Button>
              <Separator />
              <div className="text-muted-foreground space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Chapters</span>
                  <span className="text-foreground font-medium">{totalChapters}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lessons</span>
                  <span className="text-foreground font-medium">{totalLessons}</span>
                </div>
                <div className="flex justify-between">
                  <span>Level</span>
                  <span className="text-foreground font-medium capitalize">{data?.level}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="container mx-auto space-y-8 px-5 py-10">
        <div className="space-y-8 xl:max-w-[700px] 2xl:max-w-[950px]">
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-xl font-semibold">Course Description</h2>
              <p
                className="text-primary/75 text-justify leading-5"
                dangerouslySetInnerHTML={{ __html: data?.description || "" }}
              ></p>
            </div>
            <div>
              <h2 className="mb-2 text-xl font-semibold">Certification</h2>
              <p className="text-primary/75 text-justify leading-5">
                At Byway, we understand the significance of formal recognition for your hard work
                and dedication to continuous learning. Upon successful completion of our courses,
                you will earn a prestigious certification that not only validates your expertise but
                also opens doors to new opportunities in your chosen field.
              </p>
            </div>
          </div>
          <Separator />
          <div>
            <h2 className="mb-4 text-xl font-semibold">Syllabus</h2>
            <div className="overflow-hidden rounded-lg border">
              <Accordion type="multiple" defaultValue={[data?.chapters[0].id || ""]}>
                {data?.chapters.map((chapter) => {
                  return (
                    <AccordionItem value={chapter.id} key={chapter.id}>
                      <AccordionTrigger className="bg-primary/10 cursor-pointer rounded-none px-5 transition-colors hover:bg-blue-50 data-[state=open]:border-b">
                        <div className="flex w-full items-center justify-between gap-4">
                          <Label> {chapter.title}</Label>
                          <span className="text-muted-foreground text-sm font-normal">
                            {chapter.lessons.length} Lessons
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-0">
                        {chapter.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-2 border-b px-5 py-4 last:border-none"
                          >
                            {lesson.type === "lecture" ? (
                              <FileText className="size-4" />
                            ) : (
                              <FilePlay className="size-4" />
                            )}
                            <span className="text-foreground truncate font-medium">
                              {lesson.title}
                            </span>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
          <Separator />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Learner Reviews</h2>
          <div className="flex flex-col gap-8 xl:flex-row">
            <div className="border-primary/10 h-fit w-full max-w-[320px] rounded-lg border p-6">
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold">4.6</span>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`size-5 ${
                        i <= 4 ? "fill-yellow-500 stroke-yellow-500" : "stroke-yellow-500"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground mt-2 text-sm">10,313 reviews</span>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                {[
                  { star: 5, percent: 68 },
                  { star: 4, percent: 22 },
                  { star: 3, percent: 7 },
                  { star: 2, percent: 2 },
                  { star: 1, percent: 1 },
                ].map((item) => (
                  <div key={item.star} className="flex items-center gap-3">
                    <span className="w-6 text-sm">{item.star}</span>
                    <Star className="size-4 fill-yellow-500 stroke-yellow-500" />
                    <div className="bg-muted h-2 w-full rounded-full">
                      <div
                        className="h-2 rounded-full bg-yellow-500"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground w-10 text-right text-sm">
                      {item.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="border-primary/10 shadow-xs">
                  <CardContent className="flex gap-4 p-5">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="User avatar"
                      className="size-10 rounded-full"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">John Doe</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`size-4 ${
                                i <= 4 ? "fill-yellow-500 stroke-yellow-500" : "stroke-yellow-500"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Very well structured course. The instructor explains concepts clearly and
                        the examples are practical.
                      </p>
                      <span className="text-muted-foreground text-xs">2 days ago</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="self-center">
                Load more reviews
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
