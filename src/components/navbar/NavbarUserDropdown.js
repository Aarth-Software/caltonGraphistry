import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { Tooltip, Menu, MenuItem } from "@mui/material";
import useAuth from "../../hooks/useAuth";
function NavbarUserDropdown({ icon, size }) {
  const location = useLocation().pathname.split("/");
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();

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
    await signOut();
    navigate("/auth");
  };

  return (
    <>
      <div className="navMenu" style={{ position: "relative" }}>
        <Tooltip title="Menu">
          <div
            className="navMenuIconContainer"
            style={{
              boxShadow:
                anchorMenu === null
                  ? ""
                  : "rgba(60, 64, 67, 0.2) 0px .1rem .2rem 0px, rgba(60, 64, 67, 0.05) 0px .1rem .3rem .1rem",
              color: anchorMenu === null ? "black" : "#e57373",
              // position: "relative",
              zIndex: "2",
            }}
            onClick={toggleMenu}
          >
            {/* <TheamIcon style={{ cursor: "pointer" }} size={"2rem"} /> */}
            <BiMenu
              style={{ cursor: "pointer" }}
              // color="#e57373"
              size={"2.5rem"}
            />
            {/* <HiBars3 style={{ cursor: "pointer" }} color="red" size={"2rem"} /> */}
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
              // zIndex: "100",
              // position: "absolute",
              zIndex: "1",
            },
          }}
        >
          <MenuItem sx={{ fontSize: "1.1rem" }} onClick={closeMenu}>
            Contact us
          </MenuItem>
          {location[2] === "analysis" ? (
            <MenuItem sx={{ fontSize: "1.1rem" }} onClick={generateQuery}>
              Query
            </MenuItem>
          ) : (
            <MenuItem sx={{ fontSize: "1.1rem" }} onClick={dashboard}>
              Dashboard
            </MenuItem>
          )}

          <MenuItem sx={{ fontSize: "1.1rem" }} onClick={handleSignOut}>
            Sign out
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default NavbarUserDropdown;
