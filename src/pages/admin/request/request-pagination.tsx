import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { Request } from "@/types/request";
import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

type RequestPaginationProps = {
  table: Table<Request>;
};

const RequestPagination = ({ table }: RequestPaginationProps) => {
  const { open } = useSidebar();
  const pagination = table.getState().pagination;

  return (
    <div
      className={cn(
        "bg-background fixed right-0 bottom-0 flex h-14 items-center justify-between border-t px-4 transition-[left] duration-300 ease-linear",
      )}
      style={{
        left: open ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_ICON,
      }}
    >
      <p className="text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </p>
      <div className="ml-auto flex items-center gap-12">
        <div className="flex items-center gap-2">
          <p className="font-medium">Rows per page</p>
          <Select
            defaultValue={String(pagination.pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="Num." />
            </SelectTrigger>
            <SelectContent align="end" className="min-w-20">
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-medium">
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              size="icon-sm"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size="icon-sm"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPagination;
