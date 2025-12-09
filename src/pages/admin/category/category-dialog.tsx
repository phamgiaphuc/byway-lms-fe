import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteCategory } from "@/hooks/tanstack-query/use-category";
import type { Category } from "@/types/category";
import { Trash } from "lucide-react";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";

type CategoryDialogProps = {
  triggerBtn?: React.ReactNode;
  categories: Category[];
  onCancel?: () => void;
};

const CategoryDialog = ({
  triggerBtn = (
    <Button variant="destructive">
      <Trash />
      Delete
    </Button>
  ),
  categories,
  onCancel,
}: CategoryDialogProps) => {
  const [open, setOpen] = useState(false);
  const isMultiple = useMemo(() => categories.length > 1, [categories]);
  const title = useMemo(() => {
    return isMultiple ? "Delete categries" : "Delete a category";
  }, [isMultiple]);
  const subtitle = useMemo(() => {
    return isMultiple
      ? "Do you really want to delete these categories?"
      : "Do you really want to delete this category?";
  }, [isMultiple]);
  const { mutate } = useDeleteCategory();

  const onSubmit = () => {
    mutate(
      {
        ids: categories.map((category) => category.id),
      },
      {
        onSuccess: () => {
          toast.success(isMultiple ? "Delete categories successful" : "Delete category successful");
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open && onCancel) {
          onCancel();
        }
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>{triggerBtn}</DialogTrigger>
      <DialogContent style={{ maxWidth: 400 }}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category.id}>{category.name}</Badge>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive-outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={onSubmit}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
