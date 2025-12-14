
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileImage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Image</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="h-64 rounded-xl border border-dashed flex items-center justify-center text-slate-400">
          Image Preview
        </div>

        <div className="flex gap-4">
          <Button variant="outline">Upload Image</Button>
          <Button>Save Image</Button>
        </div>
      </CardContent>
    </Card>
  )
}
