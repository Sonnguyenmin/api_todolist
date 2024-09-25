import LoadLazy from '../components/LoadLazy';
import React from 'react';

//Tối ưu hóa quá trình tải trang

const NotFound = React.lazy(() => import('../pages/users/notFound'));
const Login = React.lazy(() => import('../pages/users/login'));
const Home = React.lazy(() => import('../pages/users/home'));
const Contact = React.lazy(() => import('../pages/users/contact'));
const About = React.lazy(() => import('../pages/users/about'));

//supper loading trang
//component

// Chuyển sang hàm loadlazy dùng chung
// const LoadLazy = ({ children }) => {
//   return <Suspense fallback={<Spin size="large" />}>{children}</Suspense>;
// };

const PublicRoutes = [
  {
    path: '/',
    element: <LoadLazy children={<Home />} />,
  },
  {
    path: '/contact',
    element: <LoadLazy children={<Contact />} />,
  },
  {
    path: '/about',
    element: <LoadLazy children={<About />} />,
  },
  {
    path: '/login',
    element: <LoadLazy children={<Login />} />,
  },
  {
    path: '*',
    element: <LoadLazy children={<NotFound />} />,
  },
];

export default PublicRoutes;
