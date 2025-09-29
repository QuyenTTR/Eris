import { ToastContainer, Zoom } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router";

import { publicRoutes } from "./routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((value, key) => {
            const Page = value.component;
            return <Route key={key} path={value.path} element={<Page />} />;
          })}
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        stacked
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </>
  );
}

export default App;
