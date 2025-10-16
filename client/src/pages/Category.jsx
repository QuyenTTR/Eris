import { useState, useEffect } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import api from "@/services/api";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Category() {
  const [listCategories, setListCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({});

  function getCategories() {
    api
      .get("/category")
      .then((res) => {
        setListCategories(res.data);
      })
      .catch((err) => {
        toast.error("Lỗi khi lấy dữ liệu: " + err);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  function createCategory() {
    api
      .post("/category", newCategory)
      .then((res) => {
        toast.success("Tạo danh mục mới thành công");
        getCategories();
      })
      .catch((err) => {
        toast.error("Lỗi khi tạo mới: " + err);
      });
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Danh mục</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Thêm Danh Mục</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm Danh Mục</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>Tên Danh Mục</Label>
                <Input
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Nhập tên danh mục"
                />
              </div>
              <div className="grid gap-3">
                <Label>Danh Mục Cha</Label>
                <Select
                  value={newCategory.parent ?? null}
                  onValueChange={(val) => {
                    setNewCategory({ ...newCategory, parent: val || null });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn danh mục cha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>— Không có —</SelectItem>
                    {listCategories.map((value, key) => {
                      return (
                        <SelectItem key={key} value={value._id}>
                          {value.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  createCategory();
                }}
              >
                Thêm mới
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-10 rounded-lg border-1 border-solid bg-white px-4 pb-4">
        <Table>
          {/* (>=w<=) */}
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Danh Mục Cha</TableHead>
              <TableHead>Trạng Thái</TableHead>
              <TableHead>Thao Tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listCategories.map((value, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">{key + 1}</TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>
                  {/* {listCategories.filter((v) => {
                    return v._id == value._id;
                  })} */}
                </TableCell>
                <TableCell>
                  {value.isStatus == 1 ? (
                    <Button variant="active">Hoạt động</Button>
                  ) : (
                    <Button>Đã Ẩn</Button>
                  )}
                </TableCell>
                <TableCell className="flex space-x-2">
                  <Button variant="outline-info">
                    <SquarePen />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline-danger">
                        <Trash2 />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          Xóa Danh Mục{" "}
                          <span className={"text-danger"}>{value.name}</span> ?
                        </DialogTitle>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="danger">Xóa</Button>
                        <DialogClose asChild>
                          <Button variant="outline">Hủy</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
