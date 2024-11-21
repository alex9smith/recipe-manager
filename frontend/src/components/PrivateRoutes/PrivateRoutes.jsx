import { Navigate, Outlet } from "react-router-dom";
import { authenticationService } from "../../services/authentication";
const PrivateRoutes = () => {
  if (!authenticationService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
