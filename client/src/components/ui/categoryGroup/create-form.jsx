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

function CategoryGroupCreateForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
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
              value={newCategory.name}
              onChange={handleChange(setNewCategory)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="categoryGroupDescription">Mô tả</Label>
            <Textarea
              id="categoryGroupDescription"
              name="categoryGroupDescription"
              placeholder="Mô tả nhóm danh mục (Ô này không bắt buộc)"
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
      </DialogContent> */}
    </Dialog>
  );
}

export default CategoryGroupCreateForm;
