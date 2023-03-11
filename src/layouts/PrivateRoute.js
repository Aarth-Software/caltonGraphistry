const PrivateRoute = ({ children }) => {
  // const { keycloak } = useKeycloak();

  const isLoggedIn = true;

  return <>{isLoggedIn ? children : null}</>;
};

export default PrivateRoute;
