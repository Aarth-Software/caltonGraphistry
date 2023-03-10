import React from "react";
import styled from "@emotion/styled";
import { MoreVertical } from "react-feather";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setActiveBg,
  setAnchorMenu,
} from "../../../../redux/slices/serviceSlice";

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
  const { saveOnClick, savedGraphOnClick, index, hideControls } = props;
  const dispatch = useDispatch();
  const { anchorMenu } = useSelector((state) => state.service);
  const multiMenuValue = (event, idx) => {
    if (hideControls) {
      return;
    }
    dispatch(setActiveBg(idx));
    dispatch(setAnchorMenu(event.currentTarget));
  };

  const closeMenu = () => {
    dispatch(setAnchorMenu(null));
    dispatch(setActiveBg(""));
  };

  return (
    <React.Fragment>
      <div className="dropdown-menu-container">
        <div className="icon-container">
          <IconButton
            aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={(eve) => hideControls ?? multiMenuValue(eve, index)}
            color="inherit"
            size="small"
            className="remove-padding"
            sx={{ mr: 6 }}
          >
            <Tooltip title={hideControls ? "" : "More options"}>
              <ThreenDotOptions />
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
          <SaveMenuItem onClick={saveOnClick}>Edit Record</SaveMenuItem>
          <MenuItem onClick={savedGraphOnClick}>Delete</MenuItem>
        </Menu>
      </div>
    </React.Fragment>
  );
});

export default MoreOptions;
