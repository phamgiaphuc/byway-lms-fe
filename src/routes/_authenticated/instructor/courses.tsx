import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/instructor/courses")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setHeaders } = useSidebarStore();

  useEffect(() => {
    setHeaders([
      {
        title: "Courses",
      },
    ]);
  }, []);

  return <div className="px-5">Hello "/_authenticated/instructor/courses"!</div>;
}
