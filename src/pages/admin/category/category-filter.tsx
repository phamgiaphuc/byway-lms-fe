import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useDebounce, useDidUpdate } from "rooks";
import z from "zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FormField } from "@/components/ui/form";
import { RefreshCcw, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetCategories } from "@/hooks/tanstack-query/use-category";
import { cn } from "@/lib/utils";

const categoryFilterSchema = z.object({
  keyword: z.string(),
});

export const CategoryFilter = () => {
  const { updateFilter } = useFilterStore();
  const setDebounce = useDebounce(updateFilter, 350);
  const { refetch } = useGetCategories();
  const {
    filter: { category },
  } = useFilterStore();

  const form = useForm({
    resolver: zodResolver(categoryFilterSchema),
    defaultValues: {
      keyword: category.keyword || "",
    },
  });

  useDidUpdate(() => {
    const keyword = form.getValues("keyword");

    setDebounce("category", {
      keyword,
    });
  }, [form.watch("keyword")]);

  return (
    <FormProvider {...form}>
      <div className="flex items-center gap-2 px-4">
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="Filter by ID or name" {...field} />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  variant="ghost"
                  className={cn("hover:text-destructive", !field.value && "hidden")}
                  size="icon-xs"
                  onClick={() => field.onChange("")}
                >
                  <X />
                  <span className="sr-only">Clear keyword</span>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          )}
        />
        <Button size="icon" variant="outline" onClick={() => refetch()}>
          <RefreshCcw />
        </Button>
      </div>
    </FormProvider>
  );
};
