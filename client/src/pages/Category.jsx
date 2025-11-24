import { useEffect } from "react";

import Header from "@/components/ui/header";
import CategoryCreateForm from "@/components/category/category-createForm";
import CategoryTable from "@/components/category/category-table";

import useCategoryStore from "@/stores/useCategory.store";

function Category() {
  const { getAllCategories, categories } = useCategoryStore();

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Header title="Danh mục" CreateButton={CategoryCreateForm}></Header>
      <CategoryTable categories={categories}></CategoryTable>
    </>
  );
}

export default Category;
