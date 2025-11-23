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

function CategoryCreateForm() {
  return (
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
            <Input placeholder="Nhập tên danh mục" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button>Thêm mới</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryCreateForm;
