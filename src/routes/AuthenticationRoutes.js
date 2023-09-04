import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoutes';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// dashboard page
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/register/',
      element: <AuthRegister3 />
    },
    // Wrap the protected route with ProtectedRoute
    {
      path: 'dashboard',
      element: <ProtectedRoute path="/" element={<DashboardDefault />} />
    }
  ]
};

export default AuthenticationRoutes;
