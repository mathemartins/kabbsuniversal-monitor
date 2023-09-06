import { lazy } from 'react';
import ProtectedRoute from './ProtectedRoutes';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing

// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

import { RegisteredDrivers } from 'container/registeredDrivers';
import { Trips } from 'container/trips';
import { Drivers } from 'container/drivers';

import firebase from 'api/firebase.js';
// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //
const user = firebase.auth().currentUser;
// console.log(user.multiFactor.user.email);
const email = user?.multiFactor?.user.email;

const MainRoutes = {
  path: '/dashboard',
  element: (
    <ProtectedRoute>
      <MainLayout email={email} />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: 'register-drivers',
      element: (
        <ProtectedRoute>
          <RegisteredDrivers />
        </ProtectedRoute>
      )
    },
    {
      path: 'trips',
      element: (
        <ProtectedRoute>
          <Trips />
        </ProtectedRoute>
      )
    },
    {
      path: 'drivers',
      element: (
        <ProtectedRoute>
          <Drivers />
        </ProtectedRoute>
      )
    }
    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'home',
    //       element: <DashboardDefault />
    //     },
    //     {
    //       path: 'registered-drivers',
    //       element: <RegisteredDrivers />
    //     }
    //   ]
    // },
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-typography',
    //       element: <UtilsTypography />
    //     }
    //   ]
    // },
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-color',
    //       element: <UtilsColor />
    //     }
    //   ]
    // },
    // {
    //   path: 'utils',
    //   children: [
    //     {
    //       path: 'util-shadow',
    //       element: <UtilsShadow />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'tabler-icons',
    //       element: <UtilsTablerIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'material-icons',
    //       element: <UtilsMaterialIcons />
    //     }
    //   ]
    // },
    // Wrap the protected route with ProtectedRoute
    // {
    //   path: 'dashboard',
    //   element: <ProtectedRoute path="/" element={<DashboardDefault />} />
    // }
  ]
};

export default MainRoutes;
