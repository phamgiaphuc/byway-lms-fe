import CategoryPage from "@/pages/admin/category/category-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/category")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Category - Admin",
      },
    ],
  }),
});

function RouteComponent() {
  return <CategoryPage />;
}
