import React, { useRef } from "react";
import { IconButton, Tooltip } from "@mui/material";

const UserMessageDropDown = ({ icon, message }) => {
  const ref = useRef(null);
  //   const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    // setOpen(true);
  };
  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  return (
    <React.Fragment>
      <Tooltip title={message}>
        <IconButton color="inherit" ref={ref} onClick={handleOpen} size="large">
          <img src={icon} alt={"user"} style={{ width: "1.1rem" }} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};

export default UserMessageDropDown;
