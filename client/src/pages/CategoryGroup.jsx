import Header from "@/components/ui/header";
import CategoryGroupCreateForm from "@/components/ui/categoryGroup/create-form";

function CategoryGroup() {
  return (
    <>
      <Header
        title="Nhóm danh mục"
        CreateButton={CategoryGroupCreateForm}
      ></Header>
    </>
  );
}

export default CategoryGroup;
