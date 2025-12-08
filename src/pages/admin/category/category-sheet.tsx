// Combined Create/Update Category Sheet Component
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createCategorySchema, type Category, type CreateCategorySchema } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Tags, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import FileDropzone from "@/components/file-dropzone";
import { useState, useEffect } from "react";
import { useCreateCategory, useUpdateCategory } from "@/hooks/tanstack-query/use-category";
import { toast } from "sonner";

type CategorySheetProps = {
  mode: "create" | "update";
  category: Category;
  triggerBtn?: React.ReactNode;
};

const CategorySheet = ({ mode = "create", category, triggerBtn }: CategorySheetProps) => {
  const [open, setOpen] = useState(false);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const onSubmit = (values: CreateCategorySchema) => {
    if (mode === "create") {
      createCategory.mutate(values, {
        onSuccess: (response) => {
          toast.success(response.message);
          setOpen(false);
          form.reset();
        },
      });
    } else {
      updateCategory.mutate(
        { ...category, ...values },
        {
          onSuccess: (response) => {
            toast.success(response.message);
            setOpen(false);
            form.reset();
          },
        },
      );
    }
  };

  useEffect(() => {
    if (mode === "update" && category) {
      form.reset({
        name: category.name,
        image: category.image,
      });
    }
  }, [mode, category]);

  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value && mode === "create") form.reset();
      }}
    >
      <SheetTrigger asChild>{triggerBtn}</SheetTrigger>

      <SheetContent
        className="bg-background gap-0 [&>button:first-of-type]:hidden"
        style={{ maxWidth: 450 }}
      >
        <div className="relative h-28 overflow-hidden">
          <img src="/cover.png" alt="Cover background" className="object-cover object-center" />
        </div>

        <SheetHeader className="relative">
          <SheetTitle className="text-lg">
            {mode === "create" ? "Create new category" : "Update category"}
          </SheetTitle>
          <SheetDescription>
            {mode === "create"
              ? "Add a new category. Click create when you're done."
              : "Modify the category information. Click update when you're done."}
          </SheetDescription>
          <SheetClose className="absolute top-5 right-4">
            <X className="size-4" />
          </SheetClose>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6 px-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput placeholder="Enter category name" {...field} />
                      <InputGroupAddon>
                        <Tags />
                      </InputGroupAddon>
                    </InputGroup>
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
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <FileDropzone
                      files={field.value ? [field.value] : []}
                      folder="categories"
                      onFilesChange={(files) => form.setValue("image", files[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="submit" className="w-32">
                {mode === "create" ? "Create" : "Update"}
              </Button>
              <SheetClose asChild>
                <Button type="button" variant="outline" className="w-32">
                  Cancel
                </Button>
              </SheetClose>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CategorySheet;
