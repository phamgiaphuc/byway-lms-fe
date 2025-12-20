import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteLessonById } from "@/hooks/tanstack-query/use-instructor";
import type { Lesson } from "@/types/lesson";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type LessonDeleteChapterProps = {
  lesson: Lesson;
};

const LessonDeleteChapter = ({ lesson }: LessonDeleteChapterProps) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useDeleteLessonById();

  const onSubmit = () => {
    mutate(lesson.id, {
      onSuccess: (response) => {
        toast.success(response.message);
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent style={{ maxWidth: 400 }}>
        <DialogHeader>
          <DialogTitle>Delete lesson</DialogTitle>
          <DialogDescription>Do you really want to delete this lesson?</DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          <Badge>{lesson.title}</Badge>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive-outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={onSubmit}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LessonDeleteChapter;
