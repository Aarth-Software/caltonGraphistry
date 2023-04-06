import React from "react";
import styled from "@emotion/styled";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { Tooltip, Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setShowStoreOptions } from "../../../../redux/slices/serviceSlice";

const SaveMenuItem = styled(MenuItem)`
  color: ${(props) => props.theme.palette.secondary.main};
`;

const SavePopOptions = React.memo((props) => {
  const { saveOnClick, savedGraphOnClick } = props;
  const dispatch = useDispatch();
  const { showStoreOptions } = useSelector((state) => state.service);
  const toggleMenu = (event) => {
    dispatch(setShowStoreOptions(event.currentTarget));
  };

  const closeMenu = () => {
    dispatch(setShowStoreOptions(null));
  };

  return (
    <React.Fragment>
      <div className="dropdown-menu-container">
        <Tooltip
          title={
            "The Graph button submits your query and produces the corresponding graph from the literature. The drop-down menu gives options to save your graph or to retrieve your already saved graphs."
          }
        >
          <div
            className={`icon-container`}
            // style={{ zIndex: "2000" }}
            onClick={toggleMenu}
          >
            <BiDotsVerticalRounded style={{ cursor: "pointer" }} size="2rem" />
          </div>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={showStoreOptions}
          open={Boolean(showStoreOptions)}
          onClose={closeMenu}
          PaperProps={{
            style: {
              borderRadius: ".1rem",
              boxShadow:
                "rgba(60, 64, 67, 0.2) 0px .1rem .2rem 0px, rgba(60, 64, 67, 0.05) 0px .1rem .3rem .1rem",
              zIndex: "80",
              transform: "translateX(-.4rem)",
            },
          }}
        >
          {/* <div class="dropdown-menu"> */}
          <SaveMenuItem sx={{ fontSize: "1.1rem" }} onClick={saveOnClick}>
            Save
          </SaveMenuItem>
          <MenuItem sx={{ fontSize: "1.1rem" }} onClick={savedGraphOnClick}>
            Saved Graph
          </MenuItem>
          {/* </div> */}
        </Menu>
      </div>
    </React.Fragment>
  );
});

export default SavePopOptions;
