import { createBrowserRouter } from 'react-router-dom';
import axios from 'axios';

import { DefaultLayout } from '../components/Layout'
import HelloWorld from '../pages/HelloWorld'
import HomePage from '../pages/Home'
import ItemPage from '../pages/Item'
import Admin from '../pages/Admin'
import Product from '../pages/Product';
import Category from '../pages/Category';
import Account from '../pages/Account'

const api = axios.create({ baseURL: "http://localhost:3000/api" });

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
                        ]
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
                    },
                    {
                        path: 'category',
                        children: [
                            {
                                index: true,
                                element: <Category />,
                                handle: { title: "Danh Mục" },
                            }
                        ]
                    },
                    {
                        path: 'account',
                        children: [
                            {
                                index: true,
                                element: <Account />,
                                handle: { title: "Tài Khoản" },
                            }
                        ]
                    }
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

export { publicRoutes, privateRoutes, api };