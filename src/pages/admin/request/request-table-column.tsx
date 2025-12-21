import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import type { Request, RequestStatus } from "@/types/request";
import type { User } from "@/types/user";
import type { ColumnDef } from "@tanstack/react-table";

export const requestTableColumns: ColumnDef<Request>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    size: 64,
    header: () => (
      <div className="flex items-center gap-2 pl-2">
        <span>#</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 pl-2">
        <span>{row.index + 1}</span>
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Request Title",
    cell: ({ row }) => {
      return <Label>{row.getValue("title")}</Label>;
    },
  },
  {
    accessorKey: "content",
    header: "Request Content",
    size: 300,
    cell: ({ row }) => {
      return (
        <div>
          <p className="text-wrap">{row.getValue("content")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "From",
    size: 300,
    cell: ({ row }) => {
      const user = row.getValue("user") as User;
      return (
        <div className="flex flex-col gap-1">
          <Label>{user.name}</Label>
          <span className="text-muted-foreground text-xs">ID: {user.id}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Request Type",
    cell: ({ row }) => {
      return <Badge className="capitalize">{row.getValue("type")}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: "Request Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as RequestStatus;
      return (
        <Badge
          className={cn(
            "capitalize",
            status === "pending" && "bg-blue-600",
            status === "approved" && "bg-green-600",
            status === "rejected" && "bg-red-600",
          )}
        >
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "response",
    header: "Response",
    cell: ({ row }) => {
      return <p>{row.getValue("response") || "---"}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      return <Label className="font-normal">{formatDate(row.getValue("createdAt"))}</Label>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: ({ row }) => {
      return <Label className="font-normal">{formatDate(row.getValue("updatedAt"))}</Label>;
    },
  },
];
