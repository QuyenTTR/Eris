import { useState } from "react";

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

import { handleChange } from "@/lib/handleChange";
import useCategoryStore from "@/stores/useCategory.store";

function CategoryCreateForm() {
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    categoryDescription: "",
  });
  const [open, setOpen] = useState(false);
  const { createCategory, loading } = useCategoryStore();

  async function onSubmit() {
    const categoryData = {
      name: newCategory.categoryName,
      description: newCategory.categoryDescription,
    };
    const success = await createCategory(categoryData);
    if (success) {
      setOpen(false);
      setNewCategory({ categoryName: "", categoryDescription: "" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Thêm danh mục</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Danh Mục</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="categoryName">Tên Danh Mục</Label>
            <Input
              id="categoryName"
              name="categoryName"
              placeholder="Nhập tên danh mục"
              value={newCategory.name}
              onChange={handleChange(setNewCategory)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="categoryDescription">Mô tả</Label>
            <div>
              <Textarea
                id="categoryDescription"
                name="categoryDescription"
                placeholder="Mô tả danh mục (Ô này không bắt buộc)"
                value={newCategory.description}
                onChange={handleChange(setNewCategory)}
              />
              <p className="mb-1 text-sm text-black/70">
                Dòng này sẽ hiển thị khi người dùng di chuột vào danh mục
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="categoryDescription">Mô tả</Label>
            <Textarea
              id="categoryDescription"
              name="categoryDescription"
              placeholder="Mô tả danh mục (Ô này không bắt buộc)"
              value={newCategory.description}
              onChange={handleChange(setNewCategory)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button disabled={loading} onClick={onSubmit}>
            Thêm mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryCreateForm;
