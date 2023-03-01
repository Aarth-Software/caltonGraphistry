import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import { Navigate } from "react-router-dom";

// For routes that can only be accessed by authenticated users

function AuthGuard({ children }) {
  const { keycloak, initialized } = useKeycloak();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (initialized) {
      setLoading(false);
    }
  }, [initialized]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    return <Navigate to="/userLanding" />;
  }
  return <>{children}</>;
}

export default AuthGuard;
