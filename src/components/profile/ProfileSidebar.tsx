import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

type ProfileSidebarProps = {
  name: string;
  avatarUrl?: string | null;
  activeItem?: string;
};

const NAV_ITEMS = [
  "Profile",
  "My Courses",
  "Teachers",
  "Messages",
  "My Reviews",
];

export function ProfileSidebar({
  name,
  avatarUrl,
  activeItem = "Profile",
}: ProfileSidebarProps) {
  const [imageError, setImageError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <aside className="h-[607px] w-[290px] shrink-0 space-y-6 rounded-2xl bg-slate-50 p-6">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3">
        <Avatar className="h-40 w-40 border border-slate-200">
          {avatarUrl && !imageError ? (
            <AvatarImage
              src={avatarUrl}
              alt={`${name} avatar`}
              onError={() => setImageError(true)}
              className="object-cover"
            />
          ) : null}
          <AvatarFallback className="text-3xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <p className="text-lg font-semibold text-slate-900">
          {name}
        </p>

        <Button variant="outline" className="w-full">
          Share Profile
        </Button>
      </div>

      <hr />

      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item === activeItem;

          return (
            <button
              key={item}
              className={cn(
                "w-full rounded-lg px-4 py-2 text-left text-sm transition",
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {item}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
