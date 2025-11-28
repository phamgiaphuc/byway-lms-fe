import signInBg from "@/assets/backgrounds/sign-in-bg.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initialSignIn, signInSchema, type SignInSchema } from "@/types/auth/sign-in";
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
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import GoogleLogo from "@/assets/brands/google.svg";
import FacebookLogo from "@/assets/brands/facebook.svg";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: initialSignIn,
  });

  const onSubmit = (values: SignInSchema) => {
    console.log(values);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="container mx-auto flex flex-1">
        <div className="flex flex-1 items-center justify-center px-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg space-y-5">
              <div className="text-center">
                <label className="text-2xl font-medium">Sign in to your account</label>
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
              <Button type="submit" className="group w-full">
                Sign in
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
              <div className="relative py-1.5">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background text-muted-foreground px-2">Sign in with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <Button type="button" variant="outline" className="w-full">
                  <img src={GoogleLogo} alt="Google" className="size-4" />
                  Google
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <img src={FacebookLogo} alt="Google" className="size-4" />
                  Facebook
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="relative max-w-1/3 flex-1">
          <img
            src={signInBg}
            alt="Sign in background"
            className="absolute top-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
