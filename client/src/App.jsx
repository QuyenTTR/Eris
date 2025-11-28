import { Suspense } from "react";
import { useRoutes } from "react-router";

import { Toaster } from "@/components/ui/sonner";

import { routes } from "@/routes";
import Loading from "@/pages/Loading";

function App() {
  const elements = useRoutes(routes);

  return (
    <>
      <Suspense fallback={<Loading />}>{elements}</Suspense>
      <Toaster />
    </>
  );
}

export default App;
