// components/profile/ProfileSidebar.tsx
import { Image } from "lucide-react"
import tempt from "@/assets/images/course.jpg"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ProfileSidebarProps = {
  name: string
  avatarUrl: string
  activeItem?: string
}

const NAV_ITEMS = [
  "Profile",
  "My Courses",
  "Teachers",
  "Messages",
  "My Reviews",
]

export function ProfileSidebar({
  name,
  avatarUrl,
  activeItem = "Profile",
}: ProfileSidebarProps) {
  return (
    <aside className="w-[290px] h-[607px] rounded-2xl bg-slate-50 p-6 items-center shrink-0 space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={tempt}
          alt={`${name} avatar`}
          width={160}
          height={160}
          className="rounded-full border border-slate-200 object-cover"
        />

        <p className="text-lg font-semibold text-slate-900">
          {name}
        </p>

        <Button variant="outline"  className="w-full">
          Share Profile
        </Button>
      </div>
      <hr/>

      {/* Navigation */}
      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item === activeItem

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
          )
        })}
      </nav>
    </aside>
  )
}
