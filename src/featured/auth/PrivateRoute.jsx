import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

// PrivateRoute to check if a user is logged in
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/auth/login" replace />;
};

// New PrivateAdminRoute to check for admin role
const PrivateAdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  // Check if user exists AND if the user's role is 'admin'
  return user && user.role === "admin" ? children : <Navigate to="/" replace />;
};

export { PrivateRoute, PrivateAdminRoute };
