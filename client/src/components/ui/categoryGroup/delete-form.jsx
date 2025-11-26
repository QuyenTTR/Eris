import { useState } from "react";
import { Trash2 } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import useCategoryGroupStore from "@/stores/useCategoryGroup.store";

function CategoryGroupDeleteForm({ categoryGroup }) {
  const [open, setOpen] = useState(false);
  const { deleteCategoryGroup, loading } = useCategoryGroupStore();

  async function onSubmit() {
    const success = await deleteCategoryGroup(categoryGroup._id);
    if (success) {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Chắc chắn xóa nhóm danh mục{" "}
            <span className="text-destructive">{categoryGroup.name}</span> ?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onSubmit} disabled={loading}>
            Xóa
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryGroupDeleteForm;
