import { Button } from "@/components/ui/button";
import { useGetCourses } from "@/hooks/tanstack-query/use-instructor";
import { Link } from "@tanstack/react-router";
import { Loader2, Plus } from "lucide-react";
import CourseList from "@/pages/instructor/course/course-list";

const CoursePage = () => {
  const { data, isPending } = useGetCourses();

  return (
    <div className="relative space-y-6 py-4">
      <div className="flex items-center justify-between px-4">
        <div>
          <h1 className="text-2xl font-semibold">Course Management</h1>
          <span className="text-muted-foreground">Create and manage courses here.</span>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/instructor/course/add-new">
              <Plus />
              Add course
            </Link>
          </Button>
        </div>
      </div>
      {isPending && (
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <Loader2 className="size-8 animate-spin" />
          <span className="text-sm">Data is loading, please wait a little bit...</span>
        </div>
      )}
      {data && <CourseList courses={data} />}
    </div>
  );
};

export default CoursePage;
