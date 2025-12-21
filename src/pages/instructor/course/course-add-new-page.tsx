import Editor from "@/components/editor/editor";
import FileDropzone from "@/components/file-dropzone";
import { MultiSelect } from "@/components/multi-select";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useGetCategories } from "@/hooks/tanstack-query/use-category";
import { createCourseSchema, type CreateCourseSchema } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Presentation, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourse } from "@/hooks/tanstack-query/use-course";
import { toast } from "sonner";
import { HTTPError } from "ky";
import type { ApiError } from "@/types/api-error";

const CourseAddNewPage = () => {
  const { data: categories } = useGetCategories();
  const { mutate } = useCreateCourse();
  const navigate = useNavigate();

  const categoryOptions = useMemo(
    () =>
      categories
        ? categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))
        : [],
    [categories],
  );

  const form = useForm({
    resolver: zodResolver(createCourseSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      isFree: true,
      price: 0,
      isPublished: false,
      categoryIds: [],
      level: "beginner",
    },
  });

  const onSubmit = (values: CreateCourseSchema) => {
    mutate(values, {
      onSuccess: (response) => {
        toast.success(response.message);
        navigate({
          to: "/instructor/course",
        });
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

  const isFree = form.watch("isFree");

  useEffect(() => {
    if (isFree) {
      form.setValue("price", 0, { shouldValidate: true });
      form.clearErrors("price");
    }
  }, [isFree, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-6 py-4">
        <div className="flex items-center justify-between px-4">
          <div>
            <h1 className="text-2xl font-semibold">Add new course</h1>
            <span className="text-muted-foreground">Fill in the course information.</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="destructive-outline" asChild className="w-32">
              <Link to="/instructor/course">
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
        <div className="flex items-start justify-between gap-12 px-4">
          <div className="flex max-w-5xl flex-1 flex-col space-y-6">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput placeholder="Enter title" {...field} />
                      <InputGroupAddon>
                        <Presentation />
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="subtitle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Subtitle</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupTextarea
                        placeholder="Enter subtitle"
                        className="max-h-24 min-h-24"
                        {...field}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/200 characters
                        </InputGroupText>
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
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Editor value={field.value} onChangeValue={(value) => field.onChange(value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Image</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <FileDropzone
                        files={field.value ? [field.value] : []}
                        folder="courses"
                        onFilesChange={(files) => {
                          form.clearErrors("image");
                          form.setValue("image", files[0]);
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full max-w-sm space-y-6">
            <FormField
              name="isFree"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Course Price</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-6"
                      value={field.value ? "free" : "paid"}
                      onValueChange={(value) => field.onChange(value === "free")}
                    >
                      <FormItem className="flex items-center space-y-0 space-x-1">
                        <FormControl>
                          <RadioGroupItem value="free" />
                        </FormControl>
                        <FormLabel className="font-normal">Course is free</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-1">
                        <FormControl>
                          <RadioGroupItem value="paid" />
                        </FormControl>
                        <FormLabel className="font-normal">Students have to paid</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isFree && (
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        className={cn(
                          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                        )}
                        placeholder="Enter a price"
                        prefix="$"
                        value={field.value}
                        onValueChange={(value) => field.onChange(Number(value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              name="categoryIds"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Category</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={categoryOptions}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select category"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="level"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Level</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="isPublished"
              control={form.control}
              render={({ field }) => (
                <FormItem className="border-input flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Publish course</FormLabel>
                    <p className="text-muted-foreground text-sm">
                      Make this course visible to students
                    </p>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CourseAddNewPage;
