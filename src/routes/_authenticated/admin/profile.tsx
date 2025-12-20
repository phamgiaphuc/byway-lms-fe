import { createFileRoute } from '@tanstack/react-router'
import ProfilePage from '@/pages/auth/profile-page'
import { useEffect } from "react";
import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";


export const Route = createFileRoute('/_authenticated/admin/profile')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Profile - Admin",
      },
    ],
  }),
});

function RouteComponent() {
      const { setHeaders } = useSidebarStore();
    
      useEffect(() => {
        setHeaders([
          {
            title: "Profle",
          },
        ]);
      }, []);
  return <ProfilePage/>;
}
