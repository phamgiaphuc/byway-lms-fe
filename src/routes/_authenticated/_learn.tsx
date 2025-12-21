import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_learn')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/_learn"!</div>
}
