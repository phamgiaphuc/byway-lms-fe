import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useWillUnmount } from "rooks";

export const Route = createFileRoute("/_authenticated/instructor/lesson")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setIsHeaderHidden } = useSidebarStore();

  useEffect(() => {
    setIsHeaderHidden(true);
  }, []);

  useWillUnmount(() => setIsHeaderHidden(false));

  return <Outlet />;
}
