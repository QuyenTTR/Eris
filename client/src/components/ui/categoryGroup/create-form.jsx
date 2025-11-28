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

import useCategoryGroupStore from "@/stores/useCategoryGroup.store";
import { handleChange } from "@/lib/handleChange";

function CategoryGroupCreateForm() {
  const [open, setOpen] = useState(false);
  const { createCategoryGroup, loading } = useCategoryGroupStore();
  const [newCategoryGroup, setNewCategoryGroup] = useState({
    categoryGroupName: "",
    categoryGroupDescription: "",
  });

  async function onSubmit() {
    const categoryGroupData = {
      name: newCategoryGroup.categoryGroupName,
      description: newCategoryGroup.categoryGroupDescription,
    };

    const success = await createCategoryGroup(categoryGroupData);
    if (success) {
      setOpen(false);
      setNewCategoryGroup({
        categoryGroupName: "",
        categoryGroupDescription: "",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Thêm nhóm mới</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Nhóm Danh Mục</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="categoryGroupName">Tên Nhóm</Label>
            <Input
              id="categoryGroupName"
              name="categoryGroupName"
              placeholder="Nhập tên nhóm danh mục"
              value={newCategoryGroup.categoryGroupName}
              onChange={handleChange(setNewCategoryGroup)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="categoryGroupDescription">Mô tả</Label>
            <div>
              <Textarea
                id="categoryGroupDescription"
                name="categoryGroupDescription"
                placeholder="Mô tả nhóm danh mục (Ô này không bắt buộc)"
                value={newCategoryGroup.categoryGroupDescription}
                onChange={handleChange(setNewCategoryGroup)}
              />
              <p className="mb-1 text-sm text-black/70">
                Dòng này sẽ hiển thị khi người dùng di chuột vào nhóm danh mục
              </p>
            </div>
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

export default CategoryGroupCreateForm;
