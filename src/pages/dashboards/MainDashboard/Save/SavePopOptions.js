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
import { setShowStoreOptions } from "../../../../redux/slices/serviceSlice";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;
const SaveMenuItem = styled(MenuItem)`
  color: ${(props) => props.theme.palette.secondary.main};
`;
const SavePopOptions = React.memo((props) => {
  const { saveOnClick, savedGraphOnClick } = props;
  const dispatch = useDispatch();
  const { showStoreOptions } = useSelector((state) => state.service);
  const toggleMenu = (event) => {
    console.log(event.currentTarget);
    dispatch(setShowStoreOptions(event.currentTarget));
  };

  const closeMenu = () => {
    dispatch(setShowStoreOptions(null));
  };

  return (
    <React.Fragment>
      <div className="dropdown-menu-container">
        <div className="icon-container">
          <IconButton
            aria-owns={Boolean(showStoreOptions) ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={toggleMenu}
            color="inherit"
            size="small"
            className="remove-padding"
            sx={{ mr: 6 }}
          >
            <Tooltip title={"More options"}>
              <MoreVertical />
            </Tooltip>
          </IconButton>
        </div>
        <Menu
          id="menu-appbar"
          anchorEl={showStoreOptions}
          open={Boolean(showStoreOptions)}
          onClose={closeMenu}
          sx={{ boxShadow: "0px .6px 3px rgba(0, 0, 0, 0.06)", pt: 0, mt: -1 }}
        >
          {/* <div class="dropdown-menu"> */}
          <SaveMenuItem onClick={saveOnClick}>Save</SaveMenuItem>
          <MenuItem onClick={savedGraphOnClick}>Saved Graph</MenuItem>
          {/* </div> */}
        </Menu>
      </div>
    </React.Fragment>
  );
});

export default SavePopOptions;
