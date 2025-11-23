import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

function CategoryTable({ categories }) {
  return (
    <div className="mt-10 rounded-lg border-1 border-solid bg-white px-4 pb-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Trạng Thái</TableHead>
            <TableHead>Thao Tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                {
                  <Button variant={category.isStatus ? "info" : "warning"}>
                    {category.isStatus ? "Hoạt động" : "Ẩn"}
                  </Button>
                }
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoryTable;
