import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RequestSheet from "@/pages/admin/request/request-sheet";
import { requestTableColumns } from "@/pages/admin/request/request-table-column";
import type { Request } from "@/types/request";
import { flexRender, type Table as ReactTable } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type RequestTableProps = {
  table: ReactTable<Request>;
  isLoading: boolean;
};

const RequestTable = ({ table, isLoading }: RequestTableProps) => {
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const handleRowClick = (request: Request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  return (
    <div className="max-h-[calc(100vh-258px)] max-w-[calc(100vw-258px)] overflow-x-auto overflow-y-auto border-y">
      <Table className="relative">
        <TableHeader className="sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-200 hover:bg-gray-200">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      minWidth: header.column.columnDef.size,
                      maxWidth: header.column.columnDef.size,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {isLoading ? (
          <TableBody>
            <TableRow className="h-24 w-full">
              <TableCell colSpan={requestTableColumns.length} className="items-center text-center">
                <div className="flex flex-col items-center justify-center gap-4 py-4">
                  <Loader2 className="size-8 animate-spin" />
                  <span className="text-sm">Data is loading, please wait a little bit...</span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleRowClick(row.original)}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        minWidth: cell.column.columnDef.size,
                        maxWidth: cell.column.columnDef.size,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={requestTableColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
      {selectedRequest && (
        <RequestSheet open={open} onChangeOpen={setOpen} request={selectedRequest} />
      )}
    </div>
  );
};

export default RequestTable;
