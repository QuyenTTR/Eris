import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CategoryDeleteForm from "@/components/category/category-deleteForm";
import CategoryUpdateForm from "@/components/category/category-updateForm";
import CategoryToggleStatus from "./category-toggleStatus";

function CategoryTable({ categories }) {
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
          {categories.map((category, index) => (
            <TableRow key={index}>
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
