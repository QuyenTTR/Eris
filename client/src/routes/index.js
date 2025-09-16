import Home from '@/pages/Home';
import Admin from '@/pages/Admin';

import AdminLayout from '@/Layouts/AdminLayout';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/admin', component: Admin, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
