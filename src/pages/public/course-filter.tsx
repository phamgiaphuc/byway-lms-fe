import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useGetCategories } from "@/hooks/tanstack-query/use-category";
import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import { useForm } from "react-hook-form";
import { useDidUpdate } from "rooks";

type CourseFilterForm = {
  prices: string[];
  categoryIds: string[];
};

const priceOptions = [
  { label: "Free", value: "free" },
  { label: "Under $20", value: "under-20" },
  { label: "$20 – $50", value: "20-50" },
  { label: "$50 – $100", value: "50-100" },
  { label: "Over $100", value: "over-100" },
];

const CourseFilter = () => {
  const { data } = useGetCategories();
  const { updateFilter } = useFilterStore();

  const form = useForm<CourseFilterForm>({
    defaultValues: {
      prices: [],
      categoryIds: [],
    },
  });
  const prices = form.watch("prices");
  const categoryIds = form.watch("categoryIds");

  useDidUpdate(() => {
    updateFilter("course", {
      categoryIds: categoryIds,
      prices: prices,
    });
  }, [prices, categoryIds]);

  return (
    <Form {...form}>
      <form className="space-y-4">
        <Accordion type="multiple" defaultValue={["category", "rating", "price"]}>
          <AccordionItem value="category">
            <AccordionTrigger className="text-base font-semibold">
              Category ({data?.length || 0})
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {data?.map((category) => (
                  <FormField
                    key={category.id}
                    control={form.control}
                    name="categoryIds"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange(
                                field.value.includes(category.id)
                                  ? field.value.filter((id) => id !== category.id)
                                  : [...field.value, category.id],
                              )
                            }
                            className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                              field.value.includes(category.id)
                                ? "bg-primary text-white"
                                : "bg-primary/10 hover:bg-primary hover:text-white"
                            }`}
                          >
                            {category.name}
                          </button>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger className="text-base font-semibold">Price</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {priceOptions.map((price) => (
                  <FormField
                    key={price.value}
                    control={form.control}
                    name="prices"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3 text-sm">
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(price.value)}
                            onCheckedChange={() =>
                              field.onChange(
                                field.value.includes(price.value)
                                  ? field.value.filter((p) => p !== price.value)
                                  : [...field.value, price.value],
                              )
                            }
                          />
                        </FormControl>
                        <span>{price.label}</span>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
};

export default CourseFilter;
