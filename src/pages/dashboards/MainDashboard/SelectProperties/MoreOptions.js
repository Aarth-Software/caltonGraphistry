import React from "react";
import styled from "@emotion/styled";
import { MoreVertical, Power } from "react-feather";
import { useNavigate } from "react-router-dom";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";
import useAuth from "../../../../hooks/useAuth";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const MoreOptions = React.memo((props) => {
  const { setOpen, seOpenSavePanel } = props;
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth/sign-in");
  };

  return (
    <React.Fragment>
      <Tooltip title="More options">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <MoreVertical />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem
          sx={{ color: "#e86a6a" }}
          onClick={() => seOpenSavePanel(true)}
        >
          Save
        </MenuItem>
        <MenuItem onClick={() => setOpen(true)}>Saved Graphs</MenuItem>
      </Menu>
    </React.Fragment>
  );
});

export default MoreOptions;
