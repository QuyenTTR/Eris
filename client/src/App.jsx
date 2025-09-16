import { BrowserRouter as Router, Routes, Route } from 'react-router';

import { publicRoutes } from '@/routes';
import DefaultLayout from '@/Layouts/DefaultLayout';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {publicRoutes.map((value, key) => {
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
      </Router>
    </>
  );
}

export default App;
