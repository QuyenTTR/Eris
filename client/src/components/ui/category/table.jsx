import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryDeleteForm from "@/components/ui/category/delete-form";
import CategoryUpdateForm from "@/components/ui/category/update-form";
import CategoryToggleStatus from "@/components/ui/category/toggleStatus-button";

import useCategoryStore from "@/stores/useCategory.store";

function CategoryTable() {
  const { getAllCategories, categories } = useCategoryStore();

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="mt-10 rounded-lg border-1 border-solid bg-white px-4 pb-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Mô Tả</TableHead>
            <TableHead>Màu</TableHead>
            <TableHead>Thuộc nhóm</TableHead>
            <TableHead>Trạng Thái</TableHead>
            <TableHead>Thao Tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="max-w-xs break-words whitespace-normal">
                {category.name}
              </TableCell>
              <TableCell className="max-w-xl break-words whitespace-normal">
                {category.description ? (
                  category.description
                ) : (
                  <p className="opacity-60">--Không có mô tả--</p>
                )}
              </TableCell>
              <TableCell>
                {category.colorHex ? (
                  <div
                    className="h-6 w-6 rounded-full border"
                    style={{ backgroundColor: category.colorHex }}
                  />
                ) : (
                  <p className="opacity-60">--Không có màu--</p>
                )}
              </TableCell>
              <TableCell>{category.categoryGroupId.name}</TableCell>
              <TableCell>
                <CategoryToggleStatus category={category} />
              </TableCell>
              <TableCell className="space-x-2">
                <CategoryUpdateForm category={category} />
                <CategoryDeleteForm category={category} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoryTable;
