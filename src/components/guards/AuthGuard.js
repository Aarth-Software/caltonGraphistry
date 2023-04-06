import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader";

// For routes that can only be accessed by authenticated users

function AuthGuard({ children }) {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) {
    return <Loader />;
  }

  if (!user?.id) {
    return <Navigate to="/auth" />;
  }
  return <>{children}</>;
}

export default AuthGuard;
