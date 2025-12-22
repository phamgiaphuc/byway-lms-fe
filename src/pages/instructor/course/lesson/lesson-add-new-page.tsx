import { Button } from "@/components/ui/button";
import { useCreateLesson, useGetChapterById } from "@/hooks/tanstack-query/use-instructor";
import { createLessonSchema, type CreateLessonSchema } from "@/types/lesson";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Book, ChevronRight, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import Editor from "@/components/editor/editor";
import FileDropzone from "@/components/file-dropzone";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { toast } from "sonner";
import { HTTPError } from "ky";
import type { ApiError } from "@/types/api-error";

const LessonAddNewPage = () => {
  const navigate = useNavigate();
  const { data: chapter } = useGetChapterById();
  const form = useForm({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      type: "lecture",
      isPublished: false,
    },
  });
  const video = form.watch("video");
  const title = form.watch("title");
  const { mutate } = useCreateLesson();

  const onSubmit = (values: CreateLessonSchema) => {
    mutate(
      {
        ...values,
        chapterId: chapter?.id || "",
      },
      {
        onSuccess: (resposne) => {
          toast.success(resposne.message);
          form.reset();
          navigate({
            to: "/instructor/course/$courseId/chapter",
            params: {
              courseId: chapter?.courseId || "",
            },
          });
        },
        onError: async (error) => {
          if (error instanceof HTTPError) {
            const { message } = await error.response.json<ApiError>();
            return toast.error(message);
          }
          toast.error(error.message);
        },
      },
    );
  };

  useEffect(() => {
    if (video) {
      form.setValue("type", "video");
    } else {
      form.setValue("type", "lecture");
    }
  }, [video]);

  return (
    <Form {...form}>
      <form className="relative space-y-6 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button size="icon-sm" variant="ghost" asChild>
              <Link
                to="/instructor/course/$courseId/chapter"
                params={{
                  courseId: chapter?.courseId || "",
                }}
              >
                <ArrowLeft />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="font-medium">{chapter?.title}</h1>
              <ChevronRight className="size-4" />
              {title ? (
                <span>{title}</span>
              ) : (
                <span className="text-muted-foreground">No lesson title</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="destructive-outline" asChild className="w-32">
              <Link
                to="/instructor/course/$courseId/chapter"
                params={{
                  courseId: chapter?.courseId || "",
                }}
              >
                Cancel
                <X />
              </Link>
            </Button>
            <Button className="w-32" type="submit">
              Submit
              <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between px-4">
          <div>
            <h2 className="text-xl font-semibold">Lesson Details</h2>
            <span className="text-muted-foreground">Fill in the lesson information.</span>
          </div>
          <div className="w-full max-w-sm">
            <FormField
              name="isPublished"
              control={form.control}
              render={({ field }) => (
                <FormItem className="border-input flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Publish lesson</FormLabel>
                    <p className="text-muted-foreground text-sm">
                      Make this lesson visible to students
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="max-w-5xl space-y-6 px-4">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Title</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput placeholder="Enter title" {...field} />
                    <InputGroupAddon>
                      <Book />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Description</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupTextarea
                      placeholder="Enter description"
                      className="max-h-24 min-h-24"
                      {...field}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/120 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Content</FormLabel>
                <FormControl>
                  <Editor
                    value={field.value}
                    onChangeValue={(value) => {
                      field.onChange(value);
                    }}
                    placeholder="Enter your content"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Video</FormLabel>
                <div className="relative">
                  <FormControl>
                    <FileDropzone
                      dropzoneOptions={{
                        accept: {
                          "video/*": [".mp4", ".mov"],
                        },
                        maxFiles: 1,
                      }}
                      subLabel="MP4 and MOV formats"
                      files={field.value ? [field.value] : []}
                      folder="videos"
                      onFilesChange={(files) => {
                        form.clearErrors("video");
                        form.setValue("video", files[0]);
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default LessonAddNewPage;
