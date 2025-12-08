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
import { createCategorySchema, type CreateCategorySchema } from "@/types/category";
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
import { useState } from "react";
import { useCreateCategory } from "@/hooks/tanstack-query/use-category";
import { toast } from "sonner";

const CategoryCreateSheet = () => {
  const [open, setOpen] = useState(false);
  const { mutate } = useCreateCategory();

  const form = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const onSubmit = (values: CreateCategorySchema) => {
    mutate(values, {
      onSuccess: (response) => {
        toast.success(response.message);
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) form.reset();
      }}
    >
      <SheetTrigger asChild>
        <Button>
          <Plus />
          Create category
        </Button>
      </SheetTrigger>
      <SheetContent
        className="bg-background gap-0 [&>button:first-of-type]:hidden"
        style={{ maxWidth: 450 }}
      >
        <div className="relative h-28 overflow-hidden">
          <img src="/cover.png" alt="Cover background" className="object-cover object-center" />
        </div>
        <SheetHeader className="relative">
          <SheetTitle className="text-lg">Create new category</SheetTitle>
          <SheetDescription>
            Make changes to categories here. Click create when you&apos;re done.
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
                      onFilesChange={(files) => {
                        form.setValue("image", files[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" className="w-32">
                Create
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

export default CategoryCreateSheet;
