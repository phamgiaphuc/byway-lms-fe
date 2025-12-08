import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatDatetime } from "@/lib/helpers";
import CategorySheet from "@/pages/admin/category/category-sheet";
import type { Category } from "@/types/category";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, ExternalLink, Trash } from "lucide-react";

export const categoryTableColumns: ColumnDef<Category>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center gap-4">
          <Link
            to={category.image.url}
            target="_blank"
            className="group relative block size-20 overflow-hidden rounded-md"
          >
            <img
              src={category.image.url}
              alt={category.image.name}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ExternalLink className="size-5 text-white" />
            </div>
          </Link>
          <div className="flex flex-col gap-1">
            <Label className="font-medium">{row.getValue("name")}</Label>
            <span className="text-muted-foreground text-xs">#{category.slug}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      return <Label className="font-normal">{formatDatetime(row.getValue("createdAt"))}</Label>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: ({ row }) => {
      return <Label className="font-normal">{formatDatetime(row.getValue("updatedAt"))}</Label>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="-ml-2 flex items-center gap-2">
          <CategorySheet
            mode="update"
            category={row.original}
            triggerBtn={
              <Button size="icon-sm" variant="ghost">
                <Edit />
              </Button>
            }
          />
          <Button size="icon-sm" variant="ghost">
            <Trash />
          </Button>
          <Button size="icon-sm" variant="ghost">
            <ExternalLink />
          </Button>
        </div>
      );
    },
  },
];
