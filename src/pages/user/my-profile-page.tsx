import FileDropzone from "@/components/file-dropzone";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { updateUserSchema, type UpdateUserSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const MyProfilePage = () => {
  const { profile } = useUserStore();
  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    values: {
      email: profile.email,
      name: profile.name,
      image: {
        url: profile.image,
        id: "",
        ext: "",
        name: profile.name,
      },
    },
  });

  const onSubmit = (values: UpdateUserSchema) => {
    console.log(values);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-lg space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="bg-muted-foreground/15"
                    placeholder="Your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
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
                <FormLabel>Avatar</FormLabel>
                <div className="relative">
                  <FormControl>
                    <FileDropzone
                      files={field.value ? [field.value] : []}
                      folder="images"
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
          <Button type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
            Update profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MyProfilePage;
