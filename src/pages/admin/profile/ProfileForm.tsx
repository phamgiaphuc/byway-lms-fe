{/* 
type UpdateMePayload = {
  name: string;
  email: string;
};
export const updateMe = async (payload: UpdateMePayload) => {
  return api
    .patch("users/me", { json: payload })
    .json<ApiResponse<User>>();
};
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { User } from "@/types/user";
import { useUser } from "@/hooks/tanstack-query/use-user";
import { updateMe } from "@/services/user-service";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type ProfileFormValues = Pick<User, "name" | "email">;

export function ProfileForm() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  const mutation = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            {user.image && (
              <AvatarImage src={user.image} alt={user.name} />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <Button variant="outline" disabled>
            Change Avatar
          </Button>

          {user.emailVerified && (
            <Badge variant="secondary">Verified</Badge>
          )}
        </div>


        <form
          onSubmit={form.handleSubmit((values) =>
            mutation.mutate(values)
          )}
          className="space-y-4"
        >
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...form.register("name", { required: true })}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email", { required: true })}
            />
          </div>

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
*/}