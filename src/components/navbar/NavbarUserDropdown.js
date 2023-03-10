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
import MenuIcon from "@mui/icons-material/Menu";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 2.2rem;
    height: 2.2rem;
  }
`;
const TheamIcon = styled(MenuIcon)`
  color: ${(props) => props.theme.palette.text.primary};
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
      <Tooltip title="Menu">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          className="menuIconCustom"
          size="large"
        >
          <TheamIcon src={icon} alt={"user"} />
          {/* <img src={icon} style={{ width: "2rem" }} alt={"user"} /> */}
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
