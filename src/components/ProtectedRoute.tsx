import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string | string[]; // Accepts either single role or array
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if route requires specific role(s)
  if (allowedRoles) {
    const rolesArray = Array.isArray(allowedRoles)
      ? allowedRoles
      : [allowedRoles];
    const userHasRole = user?.role && rolesArray.includes(user.role);

    if (!userHasRole) {
      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <i
              className="fas fa-lock text-danger"
              style={{ fontSize: "3rem" }}
            ></i>
            <h3 className="mt-3 text-danger">Access Denied</h3>
            <p className="text-muted">
              You don't have permission to access this page.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
