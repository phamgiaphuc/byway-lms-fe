import { Button } from "@/components/ui/button";
import { useGetCourses } from "@/hooks/tanstack-query/use-instructor";
import { Link } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import CourseList from "@/pages/instructor/course/course-list";
import { cn } from "@/lib/utils";

const CoursePage = () => {
  const { data, isPending } = useGetCourses();

  return (
    <div className="relative space-y-6 py-4">
      <div className="flex items-center justify-between px-4">
        <div>
          <h1 className="text-2xl font-semibold">Course Management</h1>
          <span className="text-muted-foreground">Create and manage courses here.</span>
        </div>
        <Button asChild className={cn(data && data.length === 0 && "hidden")}>
          <Link to="/instructor/course/add-new">
            <Plus />
            Add course
          </Link>
        </Button>
      </div>
      {isPending && (
        <div className="flex flex-col items-center justify-center gap-4 py-10">
          <Loader2 className="size-8 animate-spin" />
          <span className="text-muted-foreground text-sm">
            Data is loading, please wait a little bit...
          </span>
        </div>
      )}
      {data && data.length === 0 && (
        <div className="mx-4 flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-12 text-center">
          <p className="text-muted-foreground text-sm">
            No courses found. Start by creating your first course.
          </p>
          <Button asChild>
            <Link to="/instructor/course/add-new">
              <Plus />
              Create course
            </Link>
          </Button>
        </div>
      )}
      {data && data.length > 0 && <CourseList courses={data} />}
    </div>
  );
};

export default CoursePage;
