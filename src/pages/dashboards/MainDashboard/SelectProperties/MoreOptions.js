import React from "react";
import styled from "@emotion/styled";
import { MoreVertical } from "react-feather";
import { BiDotsVerticalRounded } from "react-icons/bi";
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
  const { anchorMenu, activeBg } = useSelector((state) => state.service);
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
  const active = [activeBg === index, hideControls === undefined].every(
    (eg) => eg
  );
  return (
    <React.Fragment>
      <div className="serviceOptions">
        <div
          className="servieIconContainer"
          style={{
            boxShadow: !active
              ? ""
              : "rgba(60, 64, 67, 0.2) 0px .1rem .2rem 0px, rgba(60, 64, 67, 0.05) 0px .1rem .3rem .1rem",
            color: !active ? "black" : "#e57373",
          }}
          onClick={(eve) => hideControls ?? multiMenuValue(eve, index)}
        >
          <Tooltip title={hideControls ? "" : "More options"}>
            <BiDotsVerticalRounded style={{ cursor: "pointer" }} size="2rem" />
          </Tooltip>
        </div>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={closeMenu}
          PaperProps={{
            style: {
              borderRadius: ".1rem",
              zIndex: "80",
              boxShadow:
                "rgba(131, 137, 141, 0.03) 0px .1rem .2rem 0, rgba(131, 137, 141, 0.03) 0px .1rem .3rem 0rem",
            },
          }}
        >
          <SaveMenuItem onClick={saveOnClick}>Edit Record</SaveMenuItem>
          <MenuItem onClick={savedGraphOnClick}>Delete</MenuItem>
        </Menu>
      </div>
    </React.Fragment>
  );
});

export default MoreOptions;
