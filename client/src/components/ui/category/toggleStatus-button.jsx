import { Button } from "@/components/ui/button";
import useCategoryStore from "@/stores/useCategory.store";

function CategoryToggleStatus({ category }) {
  const { toggleCategoryStatus, loading } = useCategoryStore();
  function onSubmit() {
    toggleCategoryStatus(category._id);
  }

  return (
    <Button
      disabled={loading}
      className="min-w-25.5"
      variant={category.isStatus ? "active" : ""}
      onClick={onSubmit}
    >
      {category.isStatus ? "Hoạt động" : "Đã Ẩn"}
    </Button>
  );
}

export default CategoryToggleStatus;
