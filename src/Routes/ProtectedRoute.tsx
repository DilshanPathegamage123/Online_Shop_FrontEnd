import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface ProtectedRouteProps {
  requiredRoles: ("admin" | "customer")[] | "admin" | "customer";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRoles }) => {
  const { isAuthenticated, userRole } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  const requiredRolesArray = Array.isArray(requiredRoles)
    ? requiredRoles
    : [requiredRoles];

  const hasRequiredRole = requiredRolesArray.includes(
    userRole as "admin" | "customer"
  );

  if (!hasRequiredRole) {
    if (userRole === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/home" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;