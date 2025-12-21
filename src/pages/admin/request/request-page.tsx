import { useGetRequests } from "@/hooks/tanstack-query/use-request";
import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";
import RequestPagination from "@/pages/admin/request/request-pagination";
import RequestTable from "@/pages/admin/request/request-table";
import { requestTableColumns } from "@/pages/admin/request/request-table-column";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type PaginationState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const RequestPage = () => {
  const { data, isLoading } = useGetRequests();
  const { setHeaders } = useSidebarStore();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: data ?? [],
    columns: requestTableColumns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setHeaders([
      {
        title: "Dashboard",
        url: "/admin/dashboard",
      },
      {
        title: `Request (${(data ?? []).length})`,
      },
    ]);
  }, [data]);

  return (
    <div className="relative space-y-6 py-4">
      <div className="flex items-center justify-between px-4">
        <div>
          <h1 className="text-2xl font-semibold">Request Management</h1>
          <span className="text-muted-foreground">Manage and process requests here.</span>
        </div>
      </div>
      <div className="relative space-y-4">
        <RequestTable table={table} isLoading={isLoading} />
        <RequestPagination table={table} />
      </div>
    </div>
  );
};

export default RequestPage;
