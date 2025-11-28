import { Button } from "@/components/ui/button";

import useCategoryGroupStore from "@/stores/useCategoryGroup.store";

function CategoryGroupToggleStatus({ categoryGroup }) {
  const { toggleCategoryGroupStatus, loading } = useCategoryGroupStore();
  function onSubmit() {
    toggleCategoryGroupStatus(categoryGroup._id);
  }

  return (
    <Button
      disabled={loading}
      className="min-w-25.5"
      variant={categoryGroup.isStatus ? "active" : ""}
      onClick={onSubmit}
    >
      {categoryGroup.isStatus ? "Hoạt động" : "Đã Ẩn"}
    </Button>
  );
}

export default CategoryGroupToggleStatus;
