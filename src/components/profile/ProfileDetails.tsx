// components/profile/ProfileDetails.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileInput } from "./profileInput"

export function ProfileDetails() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <ProfileInput label="First Name" placeholder="John" />
          <ProfileInput label="Last Name" placeholder="Doe" />
        </div>

        <ProfileInput label="Headline" placeholder="Frontend Developer" />

        <ProfileInput
          label="Description"
          textarea
          placeholder="Tell us about yourself..."
        />

        <ProfileInput label="Language" placeholder="English" />
      </CardContent>
    </Card>
  )
}
