import { BrowserRouter, Routes, Route } from "react-router";
import { Button } from "react-bootstrap";

import "./App.css";

import routes from "./routes";

function App() {
  return (
    <>
      <Button variant="danger">Primary</Button>
      {/* <BrowserRouter>
        <Routes>
          {routes.map((value, key) => {
            const Page = value.component;
            const Layout = value.layout || (({ children }) => <>{children}</>);
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
      </BrowserRouter> */}
    </>
  );
}

export default App;
