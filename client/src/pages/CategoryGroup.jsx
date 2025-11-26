import Header from "@/components/ui/header";
import CategoryGroupCreateForm from "@/components/ui/categoryGroup/create-form";
import CategoryGroupTable from "@/components/ui/categoryGroup/table";

function CategoryGroup() {
  return (
    <>
      <Header
        title="Nhóm danh mục"
        CreateButton={CategoryGroupCreateForm}
      ></Header>
      <CategoryGroupTable />
    </>
  );
}

export default CategoryGroup;
