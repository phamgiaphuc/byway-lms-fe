import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategorySheet from "@/pages/admin/category/category-sheet";
import { initialCategory } from "@/types/category";
import { CategoryFilter } from "@/pages/admin/category/category-filter";
import CategoryTable from "@/pages/admin/category/category-table";
import { useGetCategories } from "@/hooks/tanstack-query/use-category";
import { categoryTableColumns } from "@/pages/admin/category/category-table-column";
import { useEffect, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table";
import CategoryDialog from "@/pages/admin/category/category-dialog";
import CategoryPagination from "@/pages/admin/category/category-pagination";
import { useSidebarStore } from "@/hooks/zustand/use-sidebar-store";

const CategoryPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading } = useGetCategories();
  const { setHeaders } = useSidebarStore();

  const table = useReactTable({
    data: data ?? [],
    columns: categoryTableColumns,
    state: {
      sorting,
      rowSelection,
      pagination,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    setHeaders([
      {
        title: "Dashboard",
        url: "/admin/dashboard",
      },
      {
        title: `Category (${(data ?? []).length})`,
      },
    ]);
  }, [data]);

  return (
    <div className="relative space-y-6 py-4">
      <div className="flex items-center justify-between px-4">
        <div>
          <h1 className="text-2xl font-semibold">Category Management</h1>
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
          <CategoryDialog
            categories={table.getSelectedRowModel().rows.map((row) => row.original)}
            triggerBtn={
              <Button
                variant="destructive-outline"
                disabled={table.getSelectedRowModel().rows.length === 0}
              >
                <Trash />
                Delete ({table.getSelectedRowModel().rows.length})
              </Button>
            }
            onCancel={() => table.toggleAllRowsSelected(false)}
          />
        </div>
      </div>
      <div className="relative space-y-4">
        <CategoryFilter />
        <CategoryTable table={table} isLoading={isLoading} />
        <CategoryPagination table={table} />
      </div>
    </div>
  );
};

export default CategoryPage;
