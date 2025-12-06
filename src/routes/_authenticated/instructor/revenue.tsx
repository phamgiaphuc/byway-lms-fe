import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/instructor/revenue")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setHeaders } = useSidebarStore();

  useEffect(() => {
    setHeaders([
      {
        title: "Revenue",
      },
    ]);
  }, []);

  return <div className="px-5">Hello "/_authenticated/instructor/revenue"!</div>;
}
