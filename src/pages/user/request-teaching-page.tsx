import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useCreateTeachRequest, useGetRequests } from "@/hooks/tanstack-query/use-request";
import type { ApiError } from "@/types/api-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { HTTPError } from "ky";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const IntroductionSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">1. Introduction</h2>
      <p className="leading-6">
        We value our reputation for providing the highest quality of education within an
        international context. We believe that every child matters. All gifts and talents are
        recognised and nurtured so that pupils are prepared to become responsible, caring, active
        members of a global community in the twenty-first century.
      </p>
      <span className="font-medium uppercase">School Aims</span>
      <ul className="ml-4 list-inside list-disc space-y-1">
        <li>
          To create a learning environment that challenges and supports pupils to achieve high
          standards in the pursuit of excellence.
        </li>
        <li>
          To create a supportive, interactive educational environment that will promote the
          development of independent, life-long learners.
        </li>
        <li>
          To recognize the importance of the technological world in which we live, and therefore to
          embrace new technology and to make it an integral part of teaching and learning across the
          curriculum.
        </li>
        <li>
          To promote opportunities for communication, collaboration, creativity and critical
          thinking in all aspects of teaching and learning.
        </li>
        <li>
          In partnership with the community, to develop an awareness of local and involvement in
          global issues.
        </li>
        <li>
          As an international school, to build bridges between cultures; and by developing respect,
          understanding and interest in the beliefs and cultures of others, to ensure that our
          pupils are comfortable with a multi-cultural society that embraces and celebrates the
          differences between us.
        </li>
        <li>
          To provide an environment that encourages pupils to become caring, thoughtful and
          responsible citizens.
        </li>
      </ul>
    </div>
  );
};

const TeachingSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">2. Teaching</h2>
      <span className="font-medium">
        To provide high-quality, excellent teaching, all teachers at our schools do the following:
      </span>
      <ul className="ml-4 list-inside list-disc space-y-1">
        <li>
          Encourage the pupils to become independent learners through a variety of teaching
          strategies, including allowing one group to work independently while the others are
          engaged in focus teaching.
        </li>
        <li>Focus teach all ability groups, ensuring equal allocation of time to each group.</li>
        <li>Promote pupil confidence through appropriate recognition of achievement.</li>
        <li>
          Make the most of opportunities for learning which lie outside the planned curriculum but
          which benefit learning, such as visits by authors, actors, and artists, exhibitions, and
          local excursions to places of cultural interest.
        </li>
        <li>
          Ensure that subject knowledge and pedagogic expertise are of a high standard and up to
          date in line with the New Primary Curriculum.
        </li>
        <li>
          While following the National Curriculum, take into account the international nature of our
          students and the context of our school.
        </li>
        <li>
          Provide a broad and balanced curriculum which is develops a love for learning, inspires
          excellence and promotes communication, collaboration, creativity and critical thinking.
        </li>
      </ul>
    </div>
  );
};

const requestTeachingSchema = z
  .object({
    agree: z.boolean(),
  })
  .refine((val) => val.agree === true, {
    message: "You must agree before submitting.",
    path: ["agree"],
  });

const RequestTeachingPage = () => {
  const form = useForm({
    resolver: zodResolver(requestTeachingSchema),
    defaultValues: {
      agree: false,
    },
  });
  const { mutate } = useCreateTeachRequest();
  const navigate = useNavigate();
  const { data, isLoading } = useGetRequests();

  const isTeachingRequestSubmitted = useMemo(
    () => data?.find((r) => r.status === "pending" && r.type === "teaching"),
    [data],
  );

  const onSubmit = (values: z.infer<typeof requestTeachingSchema>) => {
    mutate(
      {
        agree: values.agree,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          return navigate({
            to: "/request",
          });
        },
        onError: async (error) => {
          if (error instanceof HTTPError) {
            const { message } = await error.response.json<ApiError>();
            return toast.error(message);
          }
          toast.error(error.message);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="relative flex min-h-[calc(100vh-20rem)] flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="size-8 animate-spin" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-20rem)] flex-col">
      <div className="container mx-auto space-y-6 p-5">
        <div className="mt-16 flex flex-col items-center gap-1">
          <h1 className="text-2xl font-bold uppercase">Teaching and Learning policy</h1>
          <p className="text-muted-foreground">Reviewed on: Nov 2025 Next Review: Nov 2026</p>
        </div>
        <div className="max-h-100 space-y-6 overflow-scroll">
          <IntroductionSection />
          <TeachingSection />
        </div>
        {isTeachingRequestSubmitted ? (
          <div className="mx-auto w-fit rounded-md border border-green-600 bg-green-50 p-4">
            <Label className="text-green-600">
              <CheckCircle className="size-4" />
              You've already submitted the request. Please wait for the admin to process your
              request.
            </Label>
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="agree"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="terms">
                          I have read the policy and agree to become the Byway LMS's instructor.
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={!form.formState.isValid}>
                Send request
                <ArrowRight />
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default RequestTeachingPage;
