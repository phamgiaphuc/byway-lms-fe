import ProfileDropdown from "@/components/profile-dropdown";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetCourseById } from "@/hooks/tanstack-query/use-course";
import { useUserStore } from "@/hooks/zustand/use-user-store";
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

const LearnHeader = () => {
  const { profile } = useUserStore();
  const { data } = useGetCourseById();

  return (
    <header className="bg-primary border-border sticky top-0 z-50 border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between px-5">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1">
            <img src="/favicon.svg" alt="Byway LMS" className="size-6" />
            <span className="text-sm font-medium text-white">Byway</span>
          </Link>
          {data && (
            <>
              <Separator orientation="vertical" className="min-h-5 bg-white" />
              <Label className="text-white">{data.title}</Label>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="mr-2 flex">
            <Button size="sm" variant="ghost" className="text-white">
              <Star className="fill-yellow-500 stroke-yellow-500" />
              Provide rating
            </Button>
          </div>
          <ProfileDropdown profile={profile} />
        </div>
      </nav>
    </header>
  );
};

export default LearnHeader;
