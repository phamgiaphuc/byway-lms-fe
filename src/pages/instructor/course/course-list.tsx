import type { Course } from "@/types/course";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";

type CourseListProps = {
  courses: Course[];
};

const MAX_CATEGORIES = 3;

const CourseList = ({ courses }: CourseListProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => {
        const visibleCategories = course.categories.slice(0, MAX_CATEGORIES);
        const remainingCount = course.categories.length - MAX_CATEGORIES;

        return (
          <Card
            key={course.id}
            className="cursor-pointer gap-0 pt-0 shadow-xs transition-shadow duration-200 hover:shadow-md"
            onClick={() =>
              navigate({
                to: "/instructor/course/$courseId",
                params: {
                  courseId: course.id,
                },
              })
            }
          >
            <CardHeader className="p-0">
              <img
                src={course.image.url}
                alt={course.title}
                className="h-40 w-full rounded-t-lg object-cover"
              />
            </CardHeader>
            <CardContent className="flex h-full flex-col justify-between space-y-4">
              <div className="space-y-2">
                <CardTitle className="text-lg">{course.title}</CardTitle>

                <div className="flex flex-wrap gap-1">
                  {visibleCategories.map((cat) => (
                    <Badge key={cat.id} variant="secondary">
                      {cat.name}
                    </Badge>
                  ))}
                  {remainingCount > 0 && (
                    <Badge variant="secondary" className="opacity-70">
                      +{remainingCount}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                {course.isFree ? (
                  <Badge variant="outline" className="border-green-600 text-green-600">
                    Free
                  </Badge>
                ) : (
                  <Badge variant="outline">${course.price}</Badge>
                )}

                <Badge variant={course.isPublished ? "default" : "destructive"} className="text-xs">
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CourseList;
