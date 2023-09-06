import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

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
    }

    // {
    //   path: 'dashboard',
    //   element: <ProtectedRoute path="/dashboard" element={<MainLayout />} />
    // },
    // Wrap the protected route with ProtectedRoute

    // {
    //   path: 'dashboard',
    //   element: <ProtectedRoute path="/dashboard" element={<DashboardDefault />} />
    // },
    // {
    //   path: 'register-drivers',
    //   element: <RegisteredDrivers />
    // },
    // {
    //   path: 'trips',
    //   element: <Trips />
    // },
    // {
    //   path: 'drivers',
    //   element: <Drivers />
    // }
  ]
};

export default AuthenticationRoutes;
