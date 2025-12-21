import {
  initialRoleRequest,
  roleRequestSchema,
  type Request,
  type RoleRequestSchema,
} from "@/types/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { INSTRUCTOR_ROLE, USER_ROLE, type Role } from "@/types/user";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, School, User, X } from "lucide-react";
import { useUpdateRequest } from "@/hooks/tanstack-query/use-request";
import { HTTPError } from "ky";
import type { ApiError } from "@/types/api-error";
import { toast } from "sonner";

type RequestRoleFormProps = {
  request: Request;
  onChangeOpen: (open: boolean) => void;
};

const RequestRoleForm = ({ request, onChangeOpen }: RequestRoleFormProps) => {
  const { mutate } = useUpdateRequest();
  const form = useForm({
    resolver: zodResolver(roleRequestSchema),
    defaultValues: {
      requestId: request.id,
      userId: request.userId,
      role: request.user?.role as Role,
      status: "approved",
      response: request.response || "",
    },
  });

  const onSubmit = (values: RoleRequestSchema) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Update request successful");
        form.reset(initialRoleRequest);
        onChangeOpen(false);
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={USER_ROLE}>
                    <User />
                    User
                  </SelectItem>
                  <SelectItem value={INSTRUCTOR_ROLE}>
                    <School />
                    Instructor
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="response"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Response</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a response for this request..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <SheetClose asChild>
            <Button type="button" variant="destructive-outline" className="w-32">
              Cancel
            </Button>
          </SheetClose>
          <ButtonGroup className="gap-0.5">
            <Button type="submit" className="w-32">
              Submit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" aria-label="More Options">
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem variant="destructive">
                  <X />
                  Reject the request
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
      </form>
    </Form>
  );
};

export default RequestRoleForm;
