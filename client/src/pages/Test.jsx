import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import useAuthStore from "@/stores/useAuth.store";
import { toast } from "sonner";

function Test() {
  const data = useAuthStore.getState();

  function handleClick() {
    console.log(data);

    api
      .get("/test")
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });
  }

  return (
    <>
      <Button onClick={handleClick}>Click me</Button>
    </>
  );
}

export default Test;
