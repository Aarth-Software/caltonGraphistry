import React from "react";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { FcMenu } from "react-icons/fc";
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
const TheamIcon = styled(FcMenu)`
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
    <>
      <div className="navMenu">
        <Tooltip title="Menu">
          <div
            className="navMenuIconContainer"
            style={{
              boxShadow:
                anchorMenu === null
                  ? ""
                  : "rgba(60, 64, 67, 0.2) 0px .1rem .2rem 0px, rgba(60, 64, 67, 0.05) 0px .1rem .3rem .1rem",
              color: anchorMenu === null ? "black" : "#e57373",
            }}
            onClick={toggleMenu}
          >
            <TheamIcon style={{ cursor: "pointer" }} size={"2rem"} />
          </div>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={closeMenu}
          PaperProps={{
            style: {
              borderRadius: ".1rem",
              boxShadow:
                "rgba(60, 64, 67, 0.2) 0px .1rem .2rem 0px, rgba(60, 64, 67, 0.05) 0px .1rem .3rem .1rem",
              zIndex: "80",
            },
          }}
        >
          <MenuItem onClick={closeMenu}>Profile</MenuItem>
          {location[2] === "analysis" ? (
            <MenuItem onClick={generateQuery}>Query</MenuItem>
          ) : (
            <MenuItem onClick={dashboard}>Dashboard</MenuItem>
          )}

          <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default NavbarUserDropdown;
