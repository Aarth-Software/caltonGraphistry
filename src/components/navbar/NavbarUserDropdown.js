import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { Tooltip, Menu, MenuItem } from "@mui/material";
import useAuth from "../../hooks/useAuth";
function NavbarUserDropdown({ icon, size }) {
  const location = useLocation().pathname.split("/");
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };
  const contactUs = () => {
    setAnchorMenu(null);
    navigate("/contact-us");
  };
  const dashboard = () => {
    setAnchorMenu(null);
    navigate("/dashboard");
  };
  const generateQuery = () => {
    setAnchorMenu(null);
    navigate("/query");
  };

  const handleSignOut = async () => {
    await signOut();
    setAnchorMenu(null);
    navigate("/auth");
  };

  return (
    <>
      <div className="navMenu" style={{ position: "relative" }}>
        <Tooltip title="Menu">
          <div
            className={`navMenuIconContainer ${
              anchorMenu !== null && "afterClass"
            }`}
            style={{
              boxShadow:
                anchorMenu === null
                  ? ""
                  : "rgba(60, 64, 67, 0.2) 0px .1rem .2rem 0px, rgba(60, 64, 67, 0.05) 0px .1rem .3rem .1rem",
              color: anchorMenu === null ? "black" : "#f16067",
              // zIndex: "10000 !important",
            }}
            onClick={toggleMenu}
          >
            <BiMenu style={{ cursor: "pointer" }} size={"2.5rem"} />
          </div>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={closeMenu}
          PaperProps={{
            style: {
              // zIndex: "1500 !important",
              borderRadius: ".1rem",
              boxShadow:
                "rgba(60, 64, 67, 0.2) 0px .1rem .2rem 0px, rgba(60, 64, 67, 0.05) 0px .1rem .3rem .1rem",
              transform: "translateX(-.5rem)",
            },
          }}
        >
          {user?.id && [
            location[1] === "contact-us" && (
              <MenuItem
                key="query"
                sx={{ fontSize: "1.1rem" }}
                onClick={generateQuery}
              >
                Query
              </MenuItem>
            ),
            location[1] === "dashboard" ? (
              <MenuItem
                key="query-db"
                sx={{ fontSize: "1.1rem" }}
                onClick={generateQuery}
              >
                Query
              </MenuItem>
            ) : (
              <MenuItem
                key="dashboard"
                sx={{ fontSize: "1.1rem" }}
                onClick={dashboard}
              >
                Dashboard
              </MenuItem>
            ),
          ]}
          {location[1] !== "contact-us" && (
            <MenuItem sx={{ fontSize: "1.1rem" }} onClick={contactUs}>
              Contact us
            </MenuItem>
          )}

          {!user?.id && [
            // location[2] === "sign-in" && (
            //   <MenuItem
            //     key="sign-in"
            //     sx={{ fontSize: "1.1rem" }}
            //     onClick={() => {
            //       setAnchorMenu(null);
            //       navigate("sign-up");
            //     }}
            //   >
            //     Sign up
            //   </MenuItem>
            // ),
            location[2] === "sign-up" && (
              <MenuItem
                key="sign-up"
                sx={{ fontSize: "1.1rem" }}
                onClick={() => {
                  setAnchorMenu(null);
                  navigate("sign-in");
                }}
              >
                Sign in
              </MenuItem>
            ),
            location[1] === "contact-us" && (
              <MenuItem
                key="sign-in-contact"
                sx={{ fontSize: "1.1rem" }}
                onClick={() => {
                  setAnchorMenu(null);
                  navigate("/auth/sign-in");
                }}
              >
                Sign in
              </MenuItem>
            ),
          ]}

          {user?.id && [
            user.isAdmin && location[2] !== "invite-user" && (
              <MenuItem
                key="invite-user"
                sx={{ fontSize: "1.1rem" }}
                onClick={() => navigate("/invite-user")}
              >
                Invite user
              </MenuItem>
            ),
            <MenuItem
              key="sign-out"
              sx={{ fontSize: "1.1rem" }}
              onClick={handleSignOut}
            >
              Sign out
            </MenuItem>,
          ]}
        </Menu>
      </div>
    </>
  );
}

export default NavbarUserDropdown;
