import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useCategoryGroupStore from "@/stores/useCategoryGroup.store";
import CategoryGroupDeleteForm from "@/components/ui/categoryGroup/delete-form";
import CategoryGroupUpdateForm from "@/components/ui/categoryGroup/update-form";
import CategoryGroupToggleStatus from "@/components/ui/categoryGroup/toggleStatus-button";

function CategoryGroupTable() {
  const { categoryGroups, getAllCategoryGroups } = useCategoryGroupStore();

  useEffect(() => {
    getAllCategoryGroups();
  }, []);

  return (
    <div className="mt-10 rounded-lg border-1 border-solid bg-white px-4 pb-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Mô Tả</TableHead>
            <TableHead>Trạng Thái</TableHead>
            <TableHead>Thao Tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryGroups.map((categoryGroup, index) => (
            <TableRow key={categoryGroup._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="max-w-xs break-words whitespace-normal">
                {categoryGroup.name}
              </TableCell>
              <TableCell className="max-w-xl break-words whitespace-normal">
                {categoryGroup.description ? (
                  categoryGroup.description
                ) : (
                  <p className="opacity-60">--Không có mô tả--</p>
                )}
              </TableCell>
              <TableCell>
                <CategoryGroupToggleStatus categoryGroup={categoryGroup} />
              </TableCell>
              <TableCell className="space-x-2">
                <CategoryGroupUpdateForm categoryGroup={categoryGroup} />
                <CategoryGroupDeleteForm categoryGroup={categoryGroup} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoryGroupTable;
