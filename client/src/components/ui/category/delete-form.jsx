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

import useCategoryStore from "@/stores/useCategory.store";

function CategoryDeleteForm({ category }) {
  const [open, setOpen] = useState(false);
  const { deleteCategory, loading } = useCategoryStore();

  async function onSubmit() {
    const success = await deleteCategory(category._id);
    if (success) {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Chắc chắn xóa danh mục{" "}
            <span className="text-destructive">{category.name}</span> ?
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

export default CategoryDeleteForm;
