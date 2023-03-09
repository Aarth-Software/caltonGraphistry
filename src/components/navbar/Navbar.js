import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";

import {
  Grid,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
} from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";

import borgorIcon from "../../asserts/BurgerIcon.svg";
import logo from "../../asserts/Logo.svg";
import NavbarUserDropdown from "./NavbarUserDropdown";
import { useNavigate } from "react-router-dom";

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Navbar = ({ onDrawerToggle }) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "5rem",
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
