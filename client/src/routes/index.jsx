import { createBrowserRouter } from 'react-router-dom';

import { DefaultLayout } from '../components/Layout'
import HelloWorld from '../pages/HelloWorld'
import HomePage from '../pages/Home'
import ItemPage from '../pages/Item'
import Admin from '../pages/Admin'
import Product from '../pages/Product';

const publicRoutes = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />, // root layout
        children: [
            {
                index: true,
                element: <HomePage />,
                handle: { title: "Trang Chủ" },
            },
            {
                path: 'admin',
                children: [
                    {
                        index: true,
                        element: <Admin />,
                        handle: { title: "Quản Lý" },
                    },
                    {
                        path: 'product',
                        children: [
                            {
                                index: true,
                                element: <Product />,
                                handle: { title: "Sản Phẩm" },
                            },
                            {
                                path: 'item',
                                children: [
                                    {
                                        index: true,
                                        element: <ItemPage />,
                                        handle: { title: "Mặt Hàng" },
                                    }
                                ]
                            }
                        ]
                    },
                ],
            },
        ],
    },
    {
        path: '/hello-world',
        element: <HelloWorld />,
    },


]);

const privateRoutes = [

];

export { publicRoutes, privateRoutes };