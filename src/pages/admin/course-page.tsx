import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CoursePage = () => {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Courses Management</h1>
          <span className="text-muted-foreground">Create and manage courses here.</span>
        </div>
        <Button>
          <Plus />
          Create course
        </Button>
      </div>
    </div>
  );
};

export default CoursePage;
