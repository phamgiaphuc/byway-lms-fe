import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { categoryTableColumns } from "@/pages/admin/category/category-table-column";
import { categories } from "@/types/category";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryCreateSheet from "@/pages/admin/category/category-create-sheet";

const CategoryPage = () => {
  const table = useReactTable({
    data: categories,
    columns: categoryTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Category Management</h1>
          <span className="text-muted-foreground">Create and manage categories here.</span>
        </div>
        <CategoryCreateSheet />
      </div>
      <div className="space-y-4">
        <div>
          <InputGroup className="max-w-sm">
            <InputGroupInput placeholder="Filter by ID or name" />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
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
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
