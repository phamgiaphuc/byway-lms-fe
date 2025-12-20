// app/profile/page.tsx
import { ProfileSidebar } from "@/components/profile/ProfileSidebar"
import { ProfileDetails } from "@/components/profile/ProfileDetails"
import { ProfileLinks } from "@/components/profile/ProfileLinks"
import { ProfileImage } from "@/components/profile/ProfileImage"
import { useUser } from "@/hooks/tanstack-query/use-user";

import DisplayInfo from "../admin/profile/ProfileInfo";

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  if (isLoading) return null;
  if (!user) return null;

  
  return (
<div className="bg-white min-h-screen flex justify-center">
  <div className="flex gap-8 py-10 max-w-6xl w-full justify-center">
    <ProfileSidebar         name={user.name}
        avatarUrl={user.image}
        activeItem="Profile" />
    <div className="flex flex-col gap-8 max-w-[950px] w-full">
          <DisplayInfo
      name={user.name}
      email={user.email}
      avatarUrl={user.image}
      emailVerified={user.emailVerified}
      createdAt={user.createdAt}
      updatedAt={user.updatedAt}
      role={user.role}
      id = {user.id}
    />

    <ProfileDetails/>
      <ProfileImage />
      <ProfileLinks />
    </div>
  </div>
</div>

  )
}

