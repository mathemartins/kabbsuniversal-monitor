// ProtectedRoute.js

import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ path, ...props }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render the protected route component
  return <Route {...props} path={path} />;
};

export default ProtectedRoute;
