import React, { useState } from "react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

import { Container, CssBaseline, Paper as MuiPaper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { spacing } from "@mui/system";

import GlobalStyle from "../components/GlobalStyle";
import Navbar from "../components/navbar/Navbar";

// import Settings from "../components/Settings";

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  background: "#FFFFF";
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      {/* <Container maxWidth={"xxl"} sx={{ p: 0 }}> */}
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isLgUp ? 6 : 4}>
          {children}
          <Outlet />
        </MainContent>
        {/* </Container> */}
      </AppContent>
      {/* <Settings /> */}
    </Root>
  );
};

export default Dashboard;
