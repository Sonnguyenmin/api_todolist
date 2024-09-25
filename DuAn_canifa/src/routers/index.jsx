import { createBrowserRouter } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

//Gộp tất cả routes lại với nhau
const routes = createBrowserRouter([...PrivateRoutes, ...PublicRoutes]);

export default routes;
