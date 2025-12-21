import ProfileDropdown from "@/components/profile-dropdown";
import TechRequestLink from "@/components/tech-request-link";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Bell, Heart, Search, ShoppingCart } from "lucide-react";

const Header = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated, profile } = useUserStore();

  return (
    <header className="bg-background border-border sticky top-0 z-50 border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1">
            <img src="/favicon.svg" alt="Byway LMS" className="size-6" />
            <span className="text-sm font-medium">Byway</span>
          </Link>
          <Link to="/course" className="text-sm">
            Courses
          </Link>
          <div className="w-[24rem]">
            <InputGroup>
              <InputGroupInput placeholder="Search courses" />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <TechRequestLink />
        </div>
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <div className="flex">
              <Button size="icon" variant="ghost">
                <Heart />
              </Button>
              <Button size="icon" variant="ghost">
                <ShoppingCart />
              </Button>
              <Button size="icon" variant="ghost">
                <Bell />
              </Button>
            </div>
            <ProfileDropdown profile={profile} queryClient={queryClient} />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost">
              <ShoppingCart />
            </Button>
            <Button className="rounded-none capitalize" variant="outline" asChild>
              <Link to="/sign-in">Sign in</Link>
            </Button>
            <Button className="rounded-none capitalize" asChild>
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
