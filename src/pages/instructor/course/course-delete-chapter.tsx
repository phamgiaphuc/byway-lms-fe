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
import { useDeleteChapterById } from "@/hooks/tanstack-query/use-instructor";
import type { Chapter } from "@/types/chapter";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CourseDeleteChapterProps = {
  chapter: Chapter;
};

const CourseDeleteChapter = ({ chapter }: CourseDeleteChapterProps) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useDeleteChapterById();

  const onSubmit = () => {
    mutate(chapter.id, {
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
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent style={{ maxWidth: 400 }}>
        <DialogHeader>
          <DialogTitle>Delete chapter</DialogTitle>
          <DialogDescription>Do you really want to delete this chapter?</DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          <Badge>{chapter.title}</Badge>
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

export default CourseDeleteChapter;
