import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";

import routes from "./routes";

import DefaultLayout from "./components/layouts/DefaultLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((value, key) => {
            const Page = value.component;
            const Layout = value.layout || DefaultLayout;
            return (
              <Route
                key={key}
                path={value.path}
                element={
                  <Layout {...value}>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
      <Toaster />
      {/* <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        stacked
      /> */}
    </>
  );
}

export default App;
