import React, { useRef } from "react";
import { IconButton, Tooltip } from "@mui/material";

const TooltipComp = ({ icon, message, size, className }) => {
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
        <IconButton
          className={className ? className : ""}
          color="inherit"
          ref={ref}
          onClick={handleOpen}
          size="large"
        >
          <img
            src={icon}
            alt={"user"}
            style={{ width: !!size ? size : "1.1rem" }}
          />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};

export default TooltipComp;
