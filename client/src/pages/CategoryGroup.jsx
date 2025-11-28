import Header from "@/components/ui/header";
import CategoryGroupCreateForm from "@/components/ui/categoryGroup/create-form";
import CategoryGroupTable from "@/components/ui/categoryGroup/table";

function CategoryGroup({ title }) {
  return (
    <>
      <Header title={title} CreateButton={CategoryGroupCreateForm}></Header>
      <CategoryGroupTable />
    </>
  );
}

export default CategoryGroup;
