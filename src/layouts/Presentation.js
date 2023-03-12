import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
const Presentation = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isInitialized } = useAuth();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (isInitialized) {
      setLoading(false);
    }
  }, [isInitialized]);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/generateQuery");
    } else {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Loader />;
  }
  return (
    // <MuiThemeProvider theme={createTheme(THEMES.DEFAULT)}>
    //   <Root>
    //     <CssBaseline />
    //     <GlobalStyle />
    //     <AppContent>
    //       {children}
    //       <Outlet />
    //     </AppContent>
    //   </Root>
    // </MuiThemeProvider>
    <Loader />
  );
};

export default Presentation;
