import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { cn } from "@/lib/utils";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { Share2 } from "lucide-react";

const navItems = [
  { label: "Profile", to: "/my-profile" },
  { label: "My Courses", to: "/my-course" },
  { label: "My Requests", to: "/my-request" },
  { label: "Settings", to: "/settings" },
];

const UserSidebar = () => {
  const { profile } = useUserStore();
  const matchRoute = useMatchRoute();

  return (
    <div className="h-fit w-full max-w-[300px] overflow-hidden rounded-lg border bg-[#F8FAFC]">
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <img src={profile.image} alt={profile.name} className="size-24 rounded-full" />
        <Label className="text-lg font-semibold">{profile.name}</Label>
        <Button variant="outline">
          Share Profile
          <Share2 />
        </Button>
      </div>
      <nav className="flex flex-col">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "hover:bg-primary border-t px-5 py-3 font-medium transition-colors hover:text-white",
              matchRoute({
                to: item.to,
              }) && "bg-primary text-white",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default UserSidebar;
