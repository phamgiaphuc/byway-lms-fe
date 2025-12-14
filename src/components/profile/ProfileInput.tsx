// components/profile/ProfileInput.tsx
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ProfileInputProps = {
  label: string
  placeholder?: string
  textarea?: boolean
}

export function ProfileInput({
  label,
  placeholder,
  textarea,
}: ProfileInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-900">
        {label}
      </label>

      {textarea ? (
        <Textarea placeholder={placeholder} />
      ) : (
        <Input placeholder={placeholder} />
      )}
    </div>
  )
}
