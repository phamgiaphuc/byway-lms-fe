import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import CategoryPage from "@/pages/admin/category/category-page";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/admin/categories")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Categories - Admin",
      },
    ],
  }),
});

function RouteComponent() {
  const { setHeaders } = useSidebarStore();

  useEffect(() => {
    setHeaders([
      {
        title: "Categories",
      },
    ]);
  }, []);

  return <CategoryPage />;
}
