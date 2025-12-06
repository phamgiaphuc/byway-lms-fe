import * as React from "react";
import { Bell, DollarSign, Kanban, LogOut, MessageSquare, Presentation } from "lucide-react";

import { NavMain, type NavItem } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { Label } from "@/components/ui/label";
import { ls } from "@/lib/helpers";
import { QueryClient } from "@tanstack/react-query";
import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/instructor/dashboard",
    icon: Kanban,
  },
  {
    title: "Courses",
    url: "/instructor/courses",
    icon: Presentation,
  },
  {
    title: "Messages",
    url: "/instructor/messages",
    icon: MessageSquare,
  },
  {
    title: "Revenue",
    url: "/instructor/revenue",
    icon: DollarSign,
  },
  {
    title: "Notifications",
    url: "/instructor/notifications",
    icon: Bell,
  },
];

export function InstructorSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const { profile, signOut } = useUserStore();
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const {} = useSidebarStore();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to="/" className={cn("flex items-center gap-1", !open && "justify-center")}>
          <img src="/favicon.svg" alt="Byway LMS" className="size-6" />
          <span className={cn("text-sm font-medium text-white", !open && "hidden")}>Byway</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className={cn("flex w-fit items-center gap-2", !open && "justify-center")}>
              <div
                className={cn("relative size-10 overflow-hidden rounded-full", !open && "size-8")}
              >
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="object-cover object-center"
                />
              </div>
              <div className={cn("flex flex-col gap-1", !open && "hidden")}>
                <Label>Hi, {profile.name}</Label>
                <span className="text-background/75 text-xs capitalize">{profile.role}</span>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem className="mt-4">
            <SidebarMenuButton
              variant="destructive"
              className="justify-center hover:text-white"
              onClick={() => {
                ls.remove("token");
                queryClient.invalidateQueries({ queryKey: ["me"] });
                signOut();
                navigate({ to: "/" });
              }}
            >
              <LogOut />
              {open && <span>Sign Out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
