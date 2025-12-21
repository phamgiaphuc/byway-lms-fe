import { useFilterStore } from "@/hooks/zustand/use-filter-store";
import LessonAddNewPage from "@/pages/instructor/course/lesson/lesson-add-new-page";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import z from "zod";

export const Route = createFileRoute("/_authenticated/instructor/lesson/add-new")({
  beforeLoad: ({ search }) => {
    if (!search.chapterId) {
      throw redirect({
        to: "/instructor/course",
      });
    }
  },
  validateSearch: z.object({
    chapterId: z.uuid(),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { chapterId } = Route.useSearch();
  const { updateFilter } = useFilterStore();

  useEffect(() => {
    updateFilter("chapter", { id: chapterId });
  }, []);

  return <LessonAddNewPage />;
}
