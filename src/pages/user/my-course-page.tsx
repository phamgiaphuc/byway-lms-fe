import { useGetMyCourses } from "@/hooks/tanstack-query/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";
import { formatDate } from "@/lib/helpers";
import { Loader2, X } from "lucide-react";

const MAX_CATEGORIES = 3;

const MyCoursePage = () => {
  const { data, isLoading } = useGetMyCourses();
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 py-4">
        <span className="text-sm">Course not found. Please try again...</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 py-4">
        <Loader2 className="size-8 animate-spin" />
        <span className="text-sm">Courses are loading, please wait a little bit...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 py-4">
        <X className="size-8" />
        <span className="text-sm">No courses have been enrolled yet.</span>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      {data.map(({ course, enrolledAt, lessonId }) => {
        const visibleCategories = course.categories.slice(0, MAX_CATEGORIES);
        const remainingCount = course.categories.length - MAX_CATEGORIES;
        return (
          <div key={course.id} className="h-fit">
            <Card
              onClick={() =>
                navigate({
                  to: "/learn/$courseId/lesson/$lessonId",
                  params: {
                    courseId: course.id,
                    lessonId: lessonId,
                  },
                })
              }
              className="h-full cursor-pointer gap-0 shadow-xs transition-shadow duration-200 hover:shadow-md"
            >
              <CardHeader>
                <img
                  src={course.image.url}
                  alt={course.title}
                  className="h-48 w-full rounded-lg object-cover"
                />
              </CardHeader>
              <CardContent className="flex h-full flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <div className="flex flex-wrap gap-1">
                    {visibleCategories.map((cat) => (
                      <Badge key={cat.id} variant="secondary" className="bg-primary/10">
                        {cat.name}
                      </Badge>
                    ))}
                    {remainingCount > 0 && (
                      <Badge variant="secondary" className="bg-primary/10">
                        +{remainingCount}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <Badge>Enrolled at {formatDate(enrolledAt)}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default MyCoursePage;
