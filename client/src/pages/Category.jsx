import { useState, useEffect } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";

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
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const [listCategories, setListCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    parentId: null,
  });
  const [editCategory, setEditCategory] = useState({
    name: "",
    parentId: null,
  });

  function getCategories() {
    api
      .get("/category")
      .then((res) => {
        setListCategories(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  function createCategory(category) {
    toast.promise(api.post("/category", category), {
      loading: "Đang tạo danh mục mới...",
      success: (res) => {
        getCategories();
        setOpenDialogCreate(false);
        setNewCategory({ name: "", parentId: null });
        return (
          <>
            Tạo danh mục{" "}
            <span className="text-info font-semibold">{category.name}</span>{" "}
            thành công
          </>
        );
      },
      error: (err) => err.response.data.message,
    });
  }

  function updateCategory(category) {
    toast.promise(api.put(`/category/${category._id}`, category), {
      loading: "Đang cập nhật danh mục...",
      success: (res) => {
        getCategories();
        setOpenDialogUpdate(false);
        setEditCategory({ name: "", parentId: null });
        return (
          <>
            Cập nhật danh mục{" "}
            <span className="text-info font-semibold">{category.name}</span>{" "}
            thành công
          </>
        );
      },
      error: (err) => err.response.data.message,
    });
  }

  function toggleStatusCategory(category) {
    category.isStatus = !category.isStatus;
    updateCategory(category);
  }

  function deleteCategory(id) {
    toast.promise(api.delete(`/category/${id}`), {
      loading: "Đang xóa danh mục...",
      success: (res) => {
        getCategories();
        return "Xóa danh mục thành công";
      },
      error: (err) => err.response.data.message,
    });
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Danh mục</h1>
        <Dialog open={openDialogCreate} onOpenChange={setOpenDialogCreate}>
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
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Nhập tên danh mục"
                />
              </div>
              <div className="grid gap-3">
                <Label>Danh Mục Cha</Label>
                <Select
                  value={newCategory.parentId}
                  onValueChange={(val) => {
                    setNewCategory({ ...newCategory, parentId: val });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn danh mục cha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>— Không có —</SelectItem>
                    {listCategories.map((value, key) => {
                      if (value.parentId) return;
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
                  createCategory(newCategory);
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
            {listCategories.length == 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Không có danh mục?{" "}
                  <span
                    className="text-info cursor-pointer hover:underline"
                    onClick={() => {
                      setOpenDialogCreate(true);
                    }}
                  >
                    Thêm mới
                  </span>{" "}
                  xem sao!
                </TableCell>
              </TableRow>
            ) : (
              listCategories.map((value, key) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">{key + 1}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  {value.parentId ? (
                    <TableCell>
                      {
                        listCategories.find((val) => val._id == value.parentId)
                          ?.name
                      }
                    </TableCell>
                  ) : (
                    <TableCell className="opacity-60">— Không có —</TableCell>
                  )}
                  <TableCell>
                    <Button
                      className="min-w-26"
                      variant={value.isStatus == 1 ? "active" : ""}
                      onClick={() => {
                        toggleStatusCategory(value);
                      }}
                    >
                      {value.isStatus == 1 ? "Hoạt động" : "Đã ẩn"}
                    </Button>
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Dialog
                      open={openDialogUpdate === value._id}
                      onOpenChange={(isOpen) => {
                        setOpenDialogUpdate(isOpen ? value._id : false);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline-info"
                          onClick={() => {
                            setEditCategory(value);
                          }}
                        >
                          <SquarePen />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Sửa Danh Mục</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid gap-3">
                            <Label>Tên Danh Mục</Label>
                            <Input
                              value={editCategory.name}
                              onChange={(e) =>
                                setEditCategory({
                                  ...editCategory,
                                  name: e.target.value,
                                })
                              }
                              placeholder="Nhập tên danh mục"
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label>Danh Mục Cha</Label>
                            <Select
                              value={editCategory.parentId}
                              onValueChange={(val) => {
                                setEditCategory({
                                  ...editCategory,
                                  parentId: val,
                                });
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn danh mục cha" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={null}>
                                  — Không có —
                                </SelectItem>
                                {listCategories
                                  .filter((v) => {
                                    return (
                                      !v.parentId && v._id != editCategory._id
                                    );
                                  })
                                  .map((v, k) => {
                                    return (
                                      <SelectItem key={k} value={v._id}>
                                        {v.name}
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
                          <Button onClick={() => updateCategory(editCategory)}>
                            Cập nhật
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog
                      open={openDialogDelete === value._id}
                      onOpenChange={(isOpen) => {
                        setOpenDialogDelete(isOpen ? value._id : false);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline-danger">
                          <Trash2 />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            Xóa Danh Mục{" "}
                            <span className={"text-danger"}>{value.name}</span>{" "}
                            ?
                          </DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="danger"
                            onClick={() => deleteCategory(value._id)}
                          >
                            Xóa
                          </Button>
                          <DialogClose asChild>
                            <Button variant="outline">Hủy</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Category;
