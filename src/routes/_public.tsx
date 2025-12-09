import Footer from "@/components/footer";
import Header from "@/components/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
