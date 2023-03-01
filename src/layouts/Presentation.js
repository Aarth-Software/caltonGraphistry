import React from "react";
import { useNavigate } from "react-router-dom";
const Presentation = ({ children }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/userLanding");
  }, [navigate]);
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
    <span>loading..</span>
  );
};

export default Presentation;
