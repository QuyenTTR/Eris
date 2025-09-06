import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from "react-toastify";

import { publicRoutes } from './routes'

function App() {

    return (
        <>
            <RouterProvider router={publicRoutes} />
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    )
}

export default App
