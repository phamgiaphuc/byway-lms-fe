import Editor from "@/components/editor/editor";
import FileDropzone from "@/components/file-dropzone";
import MultipleSelector from "@/components/multiple-selector";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useGetCategories } from "@/hooks/tanstack-query/use-category";
import { createCourseSchema, type CreateCourseSchema } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { ArrowRight, DollarSign, Presentation, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CourseAddNewPage = () => {
  const { data } = useGetCategories();

  const form = useForm({
    resolver: zodResolver(createCourseSchema),
    mode: "onChange",
    defaultValues: {
      isFree: true,
      price: 0,
      isPublished: false,
      categoryIds: [],
    },
  });

  const onSubmit = (values: CreateCourseSchema) => {
    console.log(values);
  };

  const isFree = form.watch("isFree");

  useEffect(() => {
    if (isFree) {
      form.setValue("price", 0, { shouldValidate: true });
      form.clearErrors("price");
    }
  }, [isFree, form]);
  return (
    <div className="relative space-y-6 py-4">
      <div className="flex items-center justify-between px-4">
        <div>
          <h1 className="text-2xl font-semibold">Add new course</h1>
          <span className="text-muted-foreground">Fill in the course information.</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive-outline" asChild className="w-32">
            <Link to="/instructor/course">
              Cancel
              <X />
            </Link>
          </Button>
          <Button className="w-32" disabled={!form.formState.isValid}>
            Submit
            <ArrowRight />
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-start justify-between gap-12 px-4"
        >
          <div className="col-span-3 flex flex-1 flex-col space-y-6">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput placeholder="Enter your title" {...field} />
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
                      <InputGroup>
                        <InputGroupInput
                          type="number"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          {...field}
                        />
                        <InputGroupAddon>
                          <DollarSign />
                        </InputGroupAddon>
                      </InputGroup>
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
                  <FormLabel>Categories</FormLabel>
                  <FormControl className="overflow-auto">
                    <MultipleSelector
                      value={field.value}
                      onChange={(values) => field.onChange(values)}
                      defaultOptions={(data || []).map((category) => ({
                        label: category.name,
                        value: category.id,
                      }))}
                      placeholder="Select categories"
                      hidePlaceholderWhenSelected
                    />
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
            <div>
              <Label></Label>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CourseAddNewPage;
