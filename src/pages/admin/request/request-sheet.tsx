import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Request } from "@/types/request";
import CoverBackground from "@/assets/backgrounds/cover.png";
import { Info, MessageCircle, X } from "lucide-react";
import RequestRoleForm from "@/pages/admin/request/request-role-form";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/helpers";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type RequestSheetProps = {
  open: boolean;
  onChangeOpen: (open: boolean) => void;
  request: Request;
};

const RequestSheet = ({ open, onChangeOpen, request }: RequestSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onChangeOpen}>
      <SheetContent
        className="bg-background gap-0 [&>button:first-of-type]:hidden"
        style={{ maxWidth: 450 }}
      >
        <div className="relative h-28 overflow-hidden">
          <img
            src={CoverBackground}
            alt="Cover background"
            className="object-cover object-center"
          />
        </div>
        <SheetHeader className="relative">
          <SheetTitle className="text-lg">Teaching request</SheetTitle>
          <SheetDescription>
            Modify the request information. Click submit when you're done.
          </SheetDescription>
          <SheetClose className="absolute top-5 right-4">
            <X className="size-4" />
          </SheetClose>
        </SheetHeader>
        <div className="mb-4 px-4">
          <div className="bg-input/25 border-input space-y-4 rounded-md border p-4 shadow-xs">
            <h2 className="flex items-center gap-2 font-medium">
              <Info className="size-4" />
              Request Information
            </h2>
            <div>
              <div className="flex h-8 items-center justify-between">
                <Label>Title:</Label>
                <Label className="font-normal">{request.title}</Label>
              </div>
              <div className="flex h-8 items-center justify-between">
                <Label>Content:</Label>
                <Label className="font-normal">{request.content}</Label>
              </div>
              <div className="flex h-8 items-center justify-between">
                <Label>From:</Label>
                <Label className="font-normal">{request.user?.email}</Label>
              </div>
              <div className="flex h-8 items-center justify-between">
                <Label>Status:</Label>
                <Badge
                  className={cn(
                    "capitalize",
                    request.status === "pending" && "bg-blue-600",
                    request.status === "approved" && "bg-green-600",
                    request.status === "rejected" && "bg-red-600",
                  )}
                >
                  {request.status}
                </Badge>
              </div>
              <div className="flex h-8 items-center justify-between">
                <Label>Created at:</Label>
                <Label className="font-normal">{formatDate(request.createdAt)}</Label>
              </div>
            </div>
            <Separator className="bg-primary" />
            <h2 className="flex items-center gap-2 font-medium">
              <MessageCircle className="size-4" />
              Response Information
            </h2>
            <div>
              <div className="flex h-8 items-center justify-between">
                <Label>Response:</Label>
                <Label className="font-normal">{request.response}</Label>
              </div>
              <div className="flex h-8 items-center justify-between">
                <Label>Updated at:</Label>
                <Label className="font-normal">{formatDate(request.updatedAt)}</Label>
              </div>
            </div>
          </div>
        </div>
        {request.status !== "approved" && (
          <RequestRoleForm request={request} onChangeOpen={onChangeOpen} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default RequestSheet;
