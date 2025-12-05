import { useEffect, useState } from "react";

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

import { handleChange } from "@/lib/handleChange";
import useCategoryStore from "@/stores/useCategory.store";

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

function CategoryCreateForm() {
  const [open, setOpen] = useState(false);

  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    categoryDescription: "",
    categoryColor: null,
  });

  const { createCategory, loading } = useCategoryStore();

  async function onSubmit() {
    const categoryData = {
      name: newCategory.categoryName,
      description: newCategory.categoryDescription,
      colorHex: newCategory.categoryColor,
    };
    const success = await createCategory(categoryData);
    if (success) {
      setOpen(false);
      setNewCategory({
        categoryName: "",
        categoryDescription: "",
        categoryColor: null,
      });
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
              value={newCategory.categoryName}
              onChange={handleChange(setNewCategory)}
            />
          </div>
          <div className="grid gap-3">
            <Label>Màu</Label>
            <div>
              <Select
                onValueChange={(v) =>
                  handleChange(setNewCategory)(v, "categoryColor")
                }
                value={newCategory.categoryColor}
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
              <p className="mb-1 text-sm text-black/70">
                Màu này sẽ hiển thị trong đơn hàng để phân biệt nhanh đơn hàng
                thuộc danh mục nào
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="categoryDescription">Mô tả</Label>
            <div>
              <Textarea
                id="categoryDescription"
                name="categoryDescription"
                placeholder="Mô tả danh mục (Ô này không bắt buộc)"
                value={newCategory.categoryDescription}
                onChange={handleChange(setNewCategory)}
              />
              <p className="mb-1 text-sm text-black/70">
                Dòng này sẽ hiển thị khi người dùng di chuột vào danh mục
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

export default CategoryCreateForm;
