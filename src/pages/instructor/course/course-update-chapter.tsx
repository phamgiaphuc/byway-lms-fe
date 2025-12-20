import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateChapterSchema, type Chapter, type UpdateChapterSchema } from "@/types/chapter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useUpdateChapter } from "@/hooks/tanstack-query/use-instructor";
import { toast } from "sonner";
import { HTTPError } from "ky";
import type { ApiError } from "@/types/api-error";

type CourseUpdateChapterProps = {
  chapter: Chapter;
};

const CourseUpdateChapter = ({ chapter }: CourseUpdateChapterProps) => {
  const { mutate } = useUpdateChapter();
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(updateChapterSchema),
    values: chapter,
  });

  const onSubmit = (values: UpdateChapterSchema) => {
    mutate(values, {
      onSuccess: (resposne) => {
        toast.success(resposne.message);
        setOpen(false);
        form.reset();
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

  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit chapter</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="mt-2 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Introduction to the course" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="border-border flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Publish chapter</FormLabel>
                    <p className="text-muted-foreground text-sm">
                      Make this chapter visible to students
                    </p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit">Update chapter</Button>
              <DialogClose asChild>
                <Button type="button" variant="destructive-outline">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseUpdateChapter;
