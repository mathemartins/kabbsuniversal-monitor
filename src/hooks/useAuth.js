import { useSelector } from 'react-redux';

const useAuth = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated); // Replace with your Redux selector
  return isAuthenticated;
};

export default useAuth;
