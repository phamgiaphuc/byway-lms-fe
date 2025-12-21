import { useUserStore } from "@/hooks/zustand/use-user-store";
import { env } from "@/lib/env";
import { Link } from "@tanstack/react-router";

const TechRequestLink = () => {
  const { isAuthenticated, profile } = useUserStore();

  if (profile.role !== "user") {
    return;
  }

  if (isAuthenticated) {
    return (
      <Link to="/request-teaching" className="text-sm">
        Teach on Byway
      </Link>
    );
  }

  return (
    <Link
      to="/sign-in"
      search={{
        redirectUrl: `${env.VITE_APP_URL}/request-teaching`,
      }}
      className="text-sm"
    >
      Teach on Byway
    </Link>
  );
};

export default TechRequestLink;
