import { useState } from "react";
import { SquarePen } from "lucide-react";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import useCategoryStore from "@/stores/useCategory.store";
import { handleChange } from "@/lib/handleChange";

function CategoryUpdateForm({ category }) {
  const [editCategory, setEditCategory] = useState({
    categoryName: category.name,
    categoryDescription: category.description,
  });
  const [open, setOpen] = useState(false);
  const { updateCategory, loading } = useCategoryStore();

  async function onSubmit() {
    const categoryData = {
      name: editCategory.categoryName,
      description: editCategory.categoryDescription,
    };
    const success = await updateCategory(category._id, categoryData);
    if (success) {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="info">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật danh mục</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="categoryName">Tên Danh Mục</Label>
            <Input
              id="categoryName"
              name="categoryName"
              placeholder="Nhập tên danh mục"
              value={editCategory.categoryName}
              onChange={handleChange(setEditCategory)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="categoryDescription">Mô tả</Label>
            <Textarea
              id="categoryDescription"
              name="categoryDescription"
              placeholder="Mô tả danh mục (Ô này không bắt buộc)"
              value={editCategory.categoryDescription}
              onChange={handleChange(setEditCategory)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button disabled={loading} onClick={onSubmit}>
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryUpdateForm;
