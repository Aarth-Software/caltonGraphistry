import React, { useRef } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { AiOutlineInfoCircle } from "react-icons/ai";
const TooltipComp = ({ icon, message, size, className, top }) => {
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
          style={{ color: "gray", marginTop: top }}
        >
          <AiOutlineInfoCircle size={"1rem"} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};

export default TooltipComp;
