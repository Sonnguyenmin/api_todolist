//router bảo vệ bắt buộc phải đăng nhập vào
import LoadLazy from '../components/LoadLazy';
import React from 'react';

const LayoutAdmin = React.lazy(() => import('../layouts/admin/LayoutAdmin'));
const Dashboard = React.lazy(() => import('../pages/admin/dashboard'));
const Product = React.lazy(() => import('../pages/admin/product'));
const Customer = React.lazy(() => import('../pages/admin/customer'));

const PrivateRoutes = [
  {
    path: '/admin',
    element: <LoadLazy children={<LayoutAdmin />} />,
    children: [
      {
        index: true,
        element: <LoadLazy children={<Dashboard />} />,
      },
      {
        path: 'product',
        element: <LoadLazy children={<Product />} />,
      },
      {
        path: 'customer',
        element: <LoadLazy children={<Customer />} />,
      },
    ],
  },
];

export default PrivateRoutes;

//Cơ chế bảo vệ router (): các router lồng nhau Nested routes
