import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import useCategoryStore from "@/stores/useCategory.store";
import { handleChange } from "@/lib/handleChange";

const colorOptions = [
  { value: null, label: "--Không có màu--" },
  { value: "#000000", label: "Đen" },
  { value: "#ffffff", label: "Trắng" },
  { value: "#ff0000", label: "Đỏ" },
  { value: "#00ff00", label: "Xanh lá" },
  { value: "#0000ff", label: "Xanh dương" },
  { value: "#ffff00", label: "Vàng" },
  { value: "#ffa500", label: "Cam" },
  { value: "#800080", label: "Tím" },
  { value: "#00ffff", label: "Xanh ngọc" },
  { value: "#ffc0cb", label: "Hồng" },
];

function CategoryUpdateForm({ category }) {
  const [open, setOpen] = useState(false);

  const [editCategory, setEditCategory] = useState({
    categoryName: category.name,
    categoryDescription: category.description,
    categoryColor: category.colorHex,
  });

  const { updateCategory, loading } = useCategoryStore();

  async function onSubmit() {
    const categoryData = {
      name: editCategory.categoryName,
      description: editCategory.categoryDescription,
      colorHex: editCategory.categoryColor,
    };
    const success = await updateCategory(category._id, categoryData);
    if (success) {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
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
            <Label>Màu</Label>
            <Select
              onValueChange={(v) =>
                handleChange(setEditCategory)(v, "categoryColor")
              }
              value={editCategory.categoryColor}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn 1 màu" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.label} value={color.value}>
                      <div className="flex items-center space-x-2">
                        {color.value && (
                          <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: color.value }}
                          />
                        )}
                        <span>{color.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
