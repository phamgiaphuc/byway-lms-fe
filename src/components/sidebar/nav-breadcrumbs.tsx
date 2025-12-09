import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import { Link } from "@tanstack/react-router";

const NavBreadcrumbs = () => {
  const { headers } = useSidebarStore();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {headers.map((header, index) => {
          const isLast = index === headers.length - 1;
          return header.url && !isLast ? (
            <BreadcrumbItem key={header.title}>
              <BreadcrumbLink asChild>
                <Link to={header.url}>{header.title}</Link>
              </BreadcrumbLink>
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          ) : (
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
