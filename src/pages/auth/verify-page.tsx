import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { initialVerify, verifySchema, type VerifySchema } from "@/types/auth/verify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { differenceInSeconds } from "date-fns";
import { formatCountdown, ls } from "@/lib/helpers";
import { useVerify } from "@/hooks/tanstack-query/use-auth";

const VerifyPage = () => {
  const { id, expiredAt } = useSearch({
    from: "/_auth/verify",
  });
  const { profile } = useUserStore();
  const form = useForm({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      ...initialVerify,
      verificationId: id,
      userId: profile.id,
    },
  });
  const [secondsLeft, setSecondsLeft] = useState(0);
  const { mutate } = useVerify();
  const { setProfile, setIsAuthenticated } = useUserStore();
  const navigate = useNavigate();

  const onSubmit = (values: VerifySchema) => {
    mutate(values, {
      onSuccess: (response) => {
        const {
          data: { user, token },
        } = response;
        setProfile(user);
        setIsAuthenticated(true);
        ls.set("token", token);
        navigate({
          to: "/",
        });
      },
    });
  };

  useEffect(() => {
    const exp = new Date(Number(expiredAt) * 1000);
    const update = () => {
      const diff = differenceInSeconds(exp, new Date());
      setSecondsLeft(diff > 0 ? diff : 0);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [expiredAt]);

  return (
    <div className="relative flex min-h-[calc(100vh-20rem)] flex-col">
      <div className="container mx-auto flex flex-1 items-center justify-center px-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex max-w-sm flex-col items-center space-y-6"
          >
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-medium">Please check your email</h1>
              <p className="text-muted-foreground">
                We've sent a code to{" "}
                <span className="text-foreground font-medium">{profile.email}</span>
              </p>
            </div>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            <Button type="submit" className="group w-full">
              Verify
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
            <div className="flex items-center justify-center">
              <span className="text-muted-foreground flex items-center gap-1 text-sm">
                Didn't receive an email?
                <Button
                  variant="link"
                  disabled={!!secondsLeft}
                  className="cursor-pointer px-0 hover:no-underline"
                >
                  Resend ({formatCountdown(secondsLeft)})
                </Button>
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyPage;
