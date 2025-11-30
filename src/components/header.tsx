import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background border-border sticky top-0 z-50 border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1">
            <img src="/favicon.svg" alt="Byway LMS" className="size-6" />
            <span className="text-sm font-medium">Byway</span>
          </Link>
          <Link to="/" className="text-sm">
            Categories
          </Link>
          <div className="w-[24rem]">
            <InputGroup className="h-10">
              <InputGroupInput placeholder="Search courses" />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <Link to="/" className="text-sm">
            Tech on Byway
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button className="rounded-none capitalize" size="icon" variant="ghost">
            <ShoppingCart />
          </Button>
          <Button className="rounded-none capitalize" variant="outline" asChild>
            <Link to="/sign-in">Sign in</Link>
          </Button>
          <Button className="rounded-none capitalize" asChild>
            <Link to="/sign-up">Sign up</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
