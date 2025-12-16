import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/instructor/course/$id/student',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/instructor/course/$id/student"!</div>
}
