// app/profile/page.tsx
import { ProfileSidebar } from "@/components/profile/profileSidebar"
import { ProfileDetails } from "@/components/profile/ProfileDetails"
import { ProfileLinks } from "@/components/profile/ProfileLinks"
import { ProfileImage } from "@/components/profile/ProfileImage"

export default function ProfilePage() {
  return (
<div className="bg-white min-h-screen flex justify-center">
  <div className="flex gap-8 py-10 max-w-6xl w-full justify-center">
    <ProfileSidebar />

    <div className="flex flex-col gap-8 max-w-[950px] w-full">
      <ProfileDetails />
      <ProfileImage />
      <ProfileLinks />
    </div>
  </div>
</div>

  )
}
