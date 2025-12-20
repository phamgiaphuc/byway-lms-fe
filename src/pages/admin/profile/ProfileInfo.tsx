import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const ProfileRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="font-medium">{value || "—"}</span>
  </div>
);

type DisplayInfoProps = {
  name: string;
  email?: string | null;
  avatarUrl?: string | null;
  emailVerified?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  role : string;
  id : string;
};

export default function DisplayInfo({
  name,
  email,
  avatarUrl,
  emailVerified = false,
  createdAt,
  updatedAt,
  role,
  id
}: DisplayInfoProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className=" space-y-6">
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={name} />
            ) : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl">{name}</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {email || "—"}
              </span>
              {emailVerified && (
                <Badge variant="secondary">Verified</Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-6 pt-6 sm:grid-cols-2">
          <ProfileRow
            label="Role"
            value={role}
          />
          <ProfileRow
            label="ID"
            value={id}
          />
          <ProfileRow
            label="Account Created"
            value={new Date(createdAt).toLocaleDateString()}
          />
          <ProfileRow
            label="Last Updated"
            value={new Date(updatedAt).toLocaleDateString()}
          />
        </CardContent>
      </Card>
    </div>
  );
}
