import { BrowserRouter, Routes, Route } from "react-router";

import routes from "./routes";

import DefaultLayout from "./layout/DefaultLayout";

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
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
