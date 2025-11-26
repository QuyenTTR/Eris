import Header from "@/components/ui/header";

import CategoryCreateForm from "@/components/ui/category/create-form";
import CategoryTable from "@/components/ui/category/table";

function Category() {
  return (
    <>
      <Header title="Danh mục" CreateButton={CategoryCreateForm}></Header>
      <CategoryTable />
    </>
  );
}

export default Category;
