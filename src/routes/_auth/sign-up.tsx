import SignUpPage from '@/pages/auth/sign-up-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignUpPage />;
}
