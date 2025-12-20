import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetCourses } from "@/hooks/tanstack-query/use-course";
import { Loader2, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const MAX_CATEGORIES = 3;

const CourseList = () => {
  const { data: courses, isLoading } = useGetCourses();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-4">
        <Loader2 className="size-8 animate-spin" />
        <span className="text-sm">Courses are loading, please wait a little bit...</span>
      </div>
    );
  }

  return courses && courses.length > 0 ? (
    <div className="grid grid-cols-3 gap-4">
      {courses.map((course) => {
        const visibleCategories = course.categories.slice(0, MAX_CATEGORIES);
        const remainingCount = course.categories.length - MAX_CATEGORIES;
        const totalChapters = course.chapters.length;
        return (
          <div key={course.id} className="h-fit">
            <Card
              onClick={() =>
                navigate({
                  to: "/course/$id",
                  params: {
                    id: course.id,
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
                  {course.isFree ? (
                    <Badge variant="outline" className="border-none bg-green-600 text-white">
                      Free
                    </Badge>
                  ) : (
                    <Badge>${course.price}</Badge>
                  )}
                  <Badge>{totalChapters} Chapters</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      <X className="size-8" />
      <span className="text-sm">Your courses you looking for are not found</span>
    </div>
  );
};

export default CourseList;
