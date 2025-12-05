import signUpBg from "@/assets/backgrounds/sign-up-bg.png";
import { initialSignUp, signUpSchema, type SignUpSchema } from "@/types/auth/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSignUp } from "@/hooks/tanstack-query/use-auth";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { convertToUnix } from "@/lib/helpers";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: initialSignUp,
  });
  const { mutate } = useSignUp();
  const navigate = useNavigate();
  const { setProfile } = useUserStore();

  const onSubmit = (values: SignUpSchema) => {
    mutate(values, {
      onSuccess: (response) => {
        const {
          data: { verification, user },
        } = response;
        setProfile(user);
        return navigate({
          to: "/verify",
          search: {
            id: verification.id,
            expiredAt: convertToUnix(new Date(verification.expiredAt)),
          },
        });
      },
    });
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="container mx-auto flex flex-1">
        <div className="relative max-w-1/3 flex-1">
          <img
            src={signUpBg}
            alt="Sign in background"
            className="absolute top-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 items-center justify-center px-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg space-y-6">
              <div className="text-center">
                <label className="text-2xl font-medium">Create your account</label>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <InputGroup>
                            <InputGroupInput placeholder="Enter your first name" {...field} />
                            <InputGroupAddon>
                              <User />
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <InputGroup>
                            <InputGroupInput placeholder="Enter your first name" {...field} />
                            <InputGroupAddon>
                              <User />
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput placeholder="Enter your email" {...field} />
                        <InputGroupAddon>
                          <Mail />
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <InputGroup>
                            <InputGroupInput
                              placeholder="Enter your password"
                              type={showPassword ? "text" : "password"}
                              {...field}
                            />
                            <InputGroupAddon>
                              <Lock />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff /> : <Eye />}
                                <span className="sr-only">Toogle password type</span>
                              </InputGroupButton>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <InputGroup>
                            <InputGroupInput
                              type="password"
                              placeholder="Enter your password again"
                              {...field}
                            />
                            <InputGroupAddon>
                              <Lock />
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="group w-full">
                Create account
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
              <div className="flex items-center justify-center">
                <span className="text-muted-foreground flex items-center gap-1 text-sm">
                  Already have an account?
                  <Label asChild className="hover:text-primary text-foreground font-medium">
                    <Link to="/sign-in">Sign in</Link>
                  </Label>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
