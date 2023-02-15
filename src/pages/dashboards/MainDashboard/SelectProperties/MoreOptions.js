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
  const { saveOnClick, savedGraphOnClick } = props;
  const [anchorMenu, setAnchorMenu] = React.useState(null);

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  return (
    <React.Fragment>
      <div className="dropdown-menu-container">
        <div className="icon-container">
          <IconButton
            aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={toggleMenu}
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
