import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";

import {
  Grid,
  AppBar as MuiAppBar,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import borgorIcon from "../../asserts/BurgerIcon.svg";
import logo from "../../asserts/Logo.svg";
import NavbarUserDropdown from "./NavbarUserDropdown";
import { useNavigate } from "react-router-dom";

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0.05rem 0.1rem;
`;

const Navbar = ({ theme, onDrawerToggle }) => {
  const lgMatches = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              <img
                src={logo}
                alt="logo"
                style={{
                  width: lgMatches ? "6rem" : 85,
                  // width: "6rem",
                  marginTop: ".2rem",
                  marginLeft: "1rem",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/generateQuery")}
              />
            </Grid>
            <Grid item xs />
            {/* <Grid item>
              <TooltipComp message={"Details"} icon={borgorIcon} />
            </Grid> */}
            <Grid item>
              <NavbarUserDropdown icon={borgorIcon} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withTheme(Navbar);
