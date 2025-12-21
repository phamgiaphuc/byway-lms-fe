import { categoryTableColumns } from "@/pages/admin/category/category-table-column";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender, type Table as ReactTable } from "@tanstack/react-table";
import type { Category } from "@/types/category";
import { Loader2 } from "lucide-react";

type CategoryTableProps = {
  table: ReactTable<Category>;
  isLoading: boolean;
};

const CategoryTable = ({ table, isLoading }: CategoryTableProps) => {
  return (
    <div className="max-h-[calc(100vh-258px)] overflow-y-auto border-y">
      <Table className="relative">
        <TableHeader className="sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-200 hover:bg-gray-200">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
              <TableCell colSpan={categoryTableColumns.length} className="items-center text-center">
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={categoryTableColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default CategoryTable;
