import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { categoryTableColumns } from "@/pages/admin/category/category-table-column";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import { Plus, RefreshCw, Search, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCategories } from "@/hooks/tanstack-query/use-category";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import CategorySheet from "@/pages/admin/category/category-sheet";
import { initialCategory } from "@/types/category";
import { useState } from "react";

const CategoryPage = () => {
  const { data, isLoading, refetch } = useGetCategories();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: data?.data || [],
    columns: categoryTableColumns,
    state: {
      sorting,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Category Management</h1>
          <span className="text-muted-foreground">Create and manage categories here.</span>
        </div>
        <div className="flex items-center gap-2">
          <CategorySheet
            mode="create"
            category={initialCategory}
            triggerBtn={
              <Button>
                <Plus />
                Create category
              </Button>
            }
          />
          <Button variant="destructive" disabled={table.getSelectedRowModel().rows.length === 0}>
            <Trash />
            Delete ({table.getSelectedRowModel().rows.length})
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <InputGroup className="max-w-sm">
            <InputGroupInput placeholder="Filter by ID or name" />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Button size="icon" variant="outline" onClick={() => refetch()}>
            <RefreshCw />
          </Button>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
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
                  <TableCell
                    colSpan={categoryTableColumns.length}
                    className="items-center text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-4 py-4">
                      <Spinner className="size-8" />
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
      </div>
    </div>
  );
};

export default CategoryPage;
