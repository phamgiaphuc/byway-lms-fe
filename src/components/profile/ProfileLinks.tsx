// components/profile/ProfileLinks.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileInput } from "./profileInput"

const links = [
  "Website",
  "X (Twitter)",
  "LinkedIn",
  "YouTube",
  "Facebook",
]

export function ProfileLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Links</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {links.map((label) => (
          <ProfileInput
            key={label}
            label={label}
            placeholder={`Enter ${label} URL`}
          />
        ))}
      </CardContent>
    </Card>
  )
}
