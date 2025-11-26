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

import useCategoryGroupStore from "@/stores/useCategoryGroup.store";
import { handleChange } from "@/lib/handleChange";

function CategoryGroupUpdateForm({ categoryGroup }) {
  const [editCategoryGroup, setEditCategoryGroup] = useState({
    categoryGroupName: categoryGroup.name,
    categoryGroupDescription: categoryGroup.description,
  });
  const [open, setOpen] = useState(false);
  const { updateCategoryGroup, loading } = useCategoryGroupStore();

  async function onSubmit() {
    const categoryGroupData = {
      name: editCategoryGroup.categoryGroupName,
      description: editCategoryGroup.categoryGroupDescription,
    };
    const success = await updateCategoryGroup(
      categoryGroup._id,
      categoryGroupData,
    );
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
          <DialogTitle>Cập nhật nhóm danh mục</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="categoryGroupName">Tên Nhóm Danh Mục</Label>
            <Input
              id="categoryGroupName"
              name="categoryGroupName"
              placeholder="Nhập tên nhóm danh mục"
              value={editCategoryGroup.categoryGroupName}
              onChange={handleChange(setEditCategoryGroup)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="categoryGroupDescription">Mô tả</Label>
            <Textarea
              id="categoryGroupDescription"
              name="categoryGroupDescription"
              placeholder="Mô tả nhóm danh mục (Ô này không bắt buộc)"
              value={editCategoryGroup.categoryGroupDescription}
              onChange={handleChange(setEditCategoryGroup)}
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

export default CategoryGroupUpdateForm;
