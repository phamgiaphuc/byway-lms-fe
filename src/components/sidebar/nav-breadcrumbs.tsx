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
import React from "react";

const NavBreadcrumbs = () => {
  const { headers } = useSidebarStore();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {headers.map((header, index) => {
          const isLast = index === headers.length - 1;
          return (
            <React.Fragment key={header.title}>
              {header.url && !isLast ? (
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={header.url}>{header.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>{header.title}</BreadcrumbPage>
                </BreadcrumbItem>
              )}

              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavBreadcrumbs;
