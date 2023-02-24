import React from "react";
import styled from "@emotion/styled";
import { MoreVertical } from "react-feather";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const MoreOptions = React.memo((props) => {
  const {
    saveOnClick,
    savedGraphOnClick,
    anchorMenu,
    setAnchorMenu,
    index,
    setActiveBg,
  } = props;

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const multiMenuValue = (event, idx) => {
    setActiveBg(idx);
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
    if (setActiveBg !== undefined) setActiveBg("");
  };

  return (
    <React.Fragment>
      <div className="dropdown-menu-container">
        <div className="icon-container">
          <IconButton
            aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={
              index !== undefined
                ? (eve) => multiMenuValue(eve, index)
                : toggleMenu
            }
            color="inherit"
            size="large"
            className="remove-padding"
          >
            <Tooltip title="More options">
              <MoreVertical />
            </Tooltip>
          </IconButton>
        </div>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={closeMenu}
          sx={{ boxShadow: "0px .6px 3px rgba(0, 0, 0, 0.06)" }}
        >
          {/* <div class="dropdown-menu"> */}
          <MenuItem sx={{ color: "#e86a6a" }} onClick={saveOnClick}>
            Save
          </MenuItem>
          <MenuItem onClick={savedGraphOnClick}>Saved Graphs</MenuItem>
          {/* </div> */}
        </Menu>
      </div>
    </React.Fragment>
  );
});

export default MoreOptions;
