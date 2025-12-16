import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { useGetCourseById } from "@/hooks/tanstack-query/use-instructor";
import { cn } from "@/lib/utils";
import { Link, useMatchRoute } from "@tanstack/react-router";

const CourseDetailHeader = () => {
  const { data } = useGetCourseById();
  const matchRoute = useMatchRoute();

  return (
    <header
      className={cn(
        "bg-background border-border sticky top-0 z-40 border-b px-2 shadow-xs",
        data ? "pt-2" : "flex h-14 items-center",
      )}
    >
      <div className="flex items-center">
        <SidebarTrigger className="size-8" />
        <SidebarSeparator orientation="vertical" className="ml-2 min-h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/instructor/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/instructor/course">Course</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {data && (
              <BreadcrumbItem>
                <BreadcrumbPage>{data.title}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {data && (
        <div className="mt-4 flex gap-2 pl-10">
          <Link
            to="/instructor/course/$id"
            params={{ id: data.id }}
            className={cn(
              "px-4 py-2 font-medium transition-colors",
              matchRoute({
                to: "/instructor/course/$id",
                params: { id: data.id },
              })
                ? "border-primary text-primary border-b-2"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            Overview
          </Link>
          <Link
            to="/instructor/course/$id/chapter"
            params={{ id: data.id }}
            className={cn(
              "px-4 py-2 font-medium transition-colors",
              matchRoute({
                to: "/instructor/course/$id/chapter",
                params: { id: data.id },
              })
                ? "border-primary text-primary border-b-2"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            Chapters
          </Link>
          <Link
            to="/instructor/course/$id/student"
            params={{ id: data.id }}
            className={cn(
              "px-4 py-2 font-medium transition-colors",
              matchRoute({
                to: "/instructor/course/$id/student",
                params: { id: data.id },
              })
                ? "border-primary text-primary border-b-2"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            Students
          </Link>
          <Link
            to="/instructor/course/$id/review"
            params={{ id: data.id }}
            className={cn(
              "px-4 py-2 font-medium transition-colors",
              matchRoute({
                to: "/instructor/course/$id/review",
                params: { id: data.id },
              })
                ? "border-primary text-primary border-b-2"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            Reviews
          </Link>
          <Link
            to="/instructor/course/$id/detail"
            params={{ id: data.id }}
            className={cn(
              "px-4 py-2 font-medium transition-colors",
              matchRoute({
                to: "/instructor/course/$id/detail",
                params: { id: data.id },
              })
                ? "border-primary text-primary border-b-2"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            Detail
          </Link>
          <Link
            to="/instructor/course/$id/settings"
            params={{ id: data.id }}
            className={cn(
              "px-4 py-2 font-medium transition-colors",
              matchRoute({
                to: "/instructor/course/$id/settings",
                params: { id: data.id },
              })
                ? "border-primary text-primary border-b-2"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            Settings
          </Link>
        </div>
      )}
    </header>
  );
};

export default CourseDetailHeader;
