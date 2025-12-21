import { useCreateChapter } from "@/hooks/tanstack-query/use-instructor";
import type { ApiError } from "@/types/api-error";
import { createChapterSchema, type CreateChapterSchema } from "@/types/chapter";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTTPError } from "ky";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

type CourseAddChapterProps = {
  courseId: string;
};

const CourseAddChapter = ({ courseId }: CourseAddChapterProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { mutate } = useCreateChapter();

  const form = useForm({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      courseId: courseId,
      title: "",
      isPublished: false,
    },
  });

  const onSubmit = (values: CreateChapterSchema) => {
    mutate(values, {
      onSuccess: (resposne) => {
        toast.success(resposne.message);
        setIsFormOpen(false);
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

  const onCancel = () => {
    setIsFormOpen(false);
    form.reset();
  };

  return isFormOpen ? (
    <div className="border-input bg-card animate-in fade-in-0 slide-in-from-top-2 rounded-md border p-4 shadow-xs duration-200">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Add new chapter</h2>
        <Button
          size="icon-sm"
          variant="ghost"
          className="hover:text-destructive"
          onClick={onCancel}
        >
          <X />
        </Button>
      </div>
      <Form {...form}>
        <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
            <Button type="submit">Add chapter</Button>
            <Button type="button" variant="destructive-outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  ) : (
    <Button onClick={() => setIsFormOpen(true)}>
      <Plus className="size-4" />
      Add Chapter
    </Button>
  );
};

export default CourseAddChapter;
