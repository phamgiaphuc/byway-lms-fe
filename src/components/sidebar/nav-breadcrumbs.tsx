import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import { Link } from "@tanstack/react-router";

const NavBreadcrumbs = () => {
  const { headers } = useSidebarStore();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {headers.map((header) => {
          if (header.url) {
            return (
              <BreadcrumbItem key={header.title}>
                <BreadcrumbLink asChild>
                  <Link to={header.url}>{header.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          }
          return (
            <BreadcrumbItem key={header.title}>
              <BreadcrumbPage>{header.title}</BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavBreadcrumbs;
