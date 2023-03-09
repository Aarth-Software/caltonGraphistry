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
const SaveMenuItem = styled(MenuItem)`
  color: ${(props) => props.theme.palette.secondary.main};
`;
const ThreenDotOptions = styled(MoreVertical)`
  color: ${(props) => props.theme.palette.text.primary};
`;

const MoreOptions = React.memo((props) => {
  const {
    saveOnClick,
    savedGraphOnClick,
    anchorMenu,
    setAnchorMenu,
    index,
    setActiveBg,
    text1,
    text2,
    iconCondition,
    hideControls,
  } = props;

  const toggleMenu = (event) => {
    if (hideControls) {
      return;
    }
    setAnchorMenu(event.currentTarget);
  };
  const multiMenuValue = (event, idx) => {
    if (hideControls) {
      return;
    }
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
            size="small"
            className="remove-padding"
            sx={{ mr: 6 }}
          >
            <Tooltip title={hideControls ? "" : "More options"}>
              {!!iconCondition ? <MoreVertical /> : <ThreenDotOptions />}
            </Tooltip>
          </IconButton>
        </div>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={closeMenu}
          sx={{ boxShadow: "0px .6px 3px rgba(0, 0, 0, 0.06)", pt: 0, mt: -1 }}
        >
          {/* <div class="dropdown-menu"> */}
          <SaveMenuItem onClick={saveOnClick}>{text1}</SaveMenuItem>
          <MenuItem onClick={savedGraphOnClick}>{text2}</MenuItem>
          {/* </div> */}
        </Menu>
      </div>
    </React.Fragment>
  );
});

export default MoreOptions;
