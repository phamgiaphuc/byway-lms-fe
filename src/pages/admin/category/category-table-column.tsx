import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatDatetime } from "@/lib/helpers";
import type { Category } from "@/types/category";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, ExternalLink, Trash } from "lucide-react";

export const categoryTableColumns: ColumnDef<Category>[] = [
  {
    id: "select",
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center gap-4">
          <div className="relative size-20 overflow-hidden rounded-md">
            <img
              src={category.image.url}
              alt={category.image.name}
              className="h-full object-cover object-center"
            />
          </div>
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
    cell: () => {
      return (
        <div className="-ml-2 flex items-center gap-2">
          <Button size="icon-sm" variant="ghost">
            <Edit />
          </Button>
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
