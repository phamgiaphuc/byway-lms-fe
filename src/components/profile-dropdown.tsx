import type { Role, User } from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  DollarSign,
  GitPullRequest,
  Kanban,
  LogOut,
  MessageSquare,
  Presentation,
  Settings,
  UserIcon,
  Users,
} from "lucide-react";
import { ls } from "@/lib/helpers";
import type { QueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { useMemo } from "react";

type ProfileDropdownProps = {
  profile: User;
  queryClient: QueryClient;
};

type MenuItems = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

type MenuSection = {
  label: string;
  items: MenuItems[];
};

const menu: Record<Role, MenuSection[]> = {
  user: [
    {
      label: "My Account",
      items: [
        { label: "View Profile", icon: <UserIcon />, href: "/profile" },
        { label: "My Courses", icon: <Presentation />, href: "/courses" },
        { label: "Settings", icon: <Settings />, href: "/settings" },
      ],
    },
  ],

  instructor: [
    {
      label: "Instructor",
      items: [
        { label: "Dashboard", icon: <Kanban />, href: "/instructor/dashboard" },
        { label: "Courses", icon: <Presentation />, href: "/instructor/courses" },
        { label: "Communication", icon: <MessageSquare />, href: "/instructor/messages" },
        { label: "Revenue", icon: <DollarSign />, href: "/instructor/revenue" },
        { label: "Notifications", icon: <Bell />, href: "/instructor/notifications" },
      ],
    },
  ],
  admin: [
    {
      label: "Admin",
      items: [
        { label: "Dashboard", icon: <Kanban />, href: "/admin/dashboard" },
        { label: "Courses", icon: <Presentation />, href: "/admin/courses" },
        { label: "Users Management", icon: <Users />, href: "/admin/users" },
        { label: "Requests", icon: <GitPullRequest />, href: "/admin/requests" },
      ],
    },
  ],
};

const ProfileDropdown = ({ profile, queryClient }: ProfileDropdownProps) => {
  const navigate = useNavigate();
  const { signOut } = useUserStore();

  const sections = useMemo(() => menu[profile.role] ?? [], []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="border-border data-[state=open]:border-primary size-11 overflow-hidden rounded-full border-2 p-0.5 transition-colors">
          <img
            src={profile.image}
            alt={profile.name}
            className="rounded-full object-cover object-center"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {sections.map((section, index) => (
          <div key={index}>
            {section.label && <DropdownMenuLabel>{section.label}</DropdownMenuLabel>}
            {section.items.map((item, i) => (
              <DropdownMenuItem
                key={i}
                onClick={() => {
                  if (item.href) {
                    navigate({ to: item.href });
                  }
                }}
              >
                {item.icon}
                {item.label}
              </DropdownMenuItem>
            ))}
            {index !== sections.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            ls.remove("token");
            queryClient.invalidateQueries({ queryKey: ["me"] });
            signOut();
            navigate({ to: "/" });
          }}
        >
          <LogOut />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
