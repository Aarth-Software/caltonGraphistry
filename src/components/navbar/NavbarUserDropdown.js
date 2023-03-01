import React from "react";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";

// import useAuth from "../../hooks/useAuth";
import keycloak from "../../Keycloak";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function NavbarUserDropdown({ icon, size }) {
  const location = useLocation().pathname.split("/");
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const navigate = useNavigate();
  // const { signOut } = useAuth();

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };
  const dashboard = () => {
    navigate("/generateQuery/analysis");
    setAnchorMenu(null);
  };
  const generateQuery = () => {
    navigate("/generateQuery");
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    // await signOut();
    await keycloak.logout();
    navigate("/userLanding");
  };

  return (
    <React.Fragment>
      <Tooltip title="Details">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <img
            src={icon}
            alt={"user"}
            style={{ width: !!size ? size : "1.1rem" }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        {location[2] === "analysis" ? (
          <MenuItem onClick={generateQuery}>Query</MenuItem>
        ) : (
          <MenuItem onClick={dashboard}>Dashboard</MenuItem>
        )}

        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default NavbarUserDropdown;
