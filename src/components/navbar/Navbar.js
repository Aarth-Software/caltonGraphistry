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

// import NavbarNotificationsDropdown from "./NavbarNotificationsDropdown";
// import NavbarMessagesDropdown from "./NavbarMessagesDropdown";
// import NavbarLanguagesDropdown from "./NavbarLanguagesDropdown";
import UserMessageDropDown from "./UserMessageDropDown";
import userIcon from "../../asserts/userIcon.svg";
import borgorIcon from "../../asserts/BurgerIcon.svg";
import logo from "../../asserts/Logo.svg";

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
              {/* <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Input placeholder={t("Search")} />
              </Search> */}
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "5rem",
                  marginTop: ".2rem",
                  marginLeft: "0rem",
                }}
              />
            </Grid>
            <Grid item xs />
            <Grid item>
              <UserMessageDropDown message={"User"} icon={userIcon} />
              <UserMessageDropDown message={"Details"} icon={borgorIcon} />
              {/* <NavbarMessagesDropdown />
              <NavbarNotificationsDropdown />
              <NavbarLanguagesDropdown /> */}
              {/* <NavbarUserDropdown /> */}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withTheme(Navbar);
