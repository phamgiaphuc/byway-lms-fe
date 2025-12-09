import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import CategoryPage from "@/pages/admin/category/category-page";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

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
  const { setHeaders } = useSidebarStore();

  useEffect(() => {
    setHeaders([
      {
        title: "Dashboard",
        url: "/admin/dashboard",
      },
      {
        title: "Category",
      },
    ]);
  }, []);

  return <CategoryPage />;
}
