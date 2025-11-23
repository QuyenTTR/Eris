import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";

import routes from "./routes";

import DefaultLayout from "./components/layouts/DefaultLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((value, key) => {
            const Page = value.component;
            const Layout = value.layout || DefaultLayout;
            let element = (
              <Layout {...value}>
                <Page />
              </Layout>
            );
            if (!value.public) {
              element = <ProtectedRoute>{element}</ProtectedRoute>;
            }

            return <Route key={key} path={value.path} element={element} />;
          })}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
