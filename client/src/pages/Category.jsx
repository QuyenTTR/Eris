import { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Category() {
  const [categories, setCategories] = useState([
    {
      name: "Nước uống",
      isStatus: 1,
      color: "#ff0000",
    },
  ]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Danh mục</h1>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="outline">Thêm danh mục</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Thêm danh mục</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Name</Label>
                  <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Username</Label>
                  <Input
                    id="username-1"
                    name="username"
                    defaultValue="@peduarte"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline-danger">Hủy</Button>
                </DialogClose>
                <Button type="submit">Thêm mới</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
      <div className="mt-10 rounded-lg border-1 border-solid bg-white px-4 pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Màu</TableHead>
              <TableHead>Danh Mục Cha</TableHead>
              <TableHead>Trạng Thái</TableHead>
              <TableHead>Thao Tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((value, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{key + 1}</TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>
                  <div
                    className="h-[14px] w-[14px] rounded-full"
                    style={{ backgroundColor: value.color }}
                  />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  {value.isStatus === 1 ? (
                    <Button variant="active">Hoạt động</Button>
                  ) : (
                    <Button>Đã Ẩn</Button>
                  )}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline-info">
                    <SquarePen />
                  </Button>
                  <Button variant="outline-danger">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Category;
