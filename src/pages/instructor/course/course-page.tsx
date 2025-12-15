import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

const CoursePage = () => {
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
    </div>
  );
};

export default CoursePage;
