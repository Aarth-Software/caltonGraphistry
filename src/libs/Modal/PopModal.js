import { Box, Modal } from "@mui/material";
import React from "react";

const PopModal = ({
  openModal,
  setModalOpen,
  child,
  classProp,
  setAnchorMenu,
}) => {
  const handleClose = () => {
    setModalOpen(false);
    if (setAnchorMenu !== undefined) {
      setAnchorMenu(null);
    }
  };
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={classProp}>{child}</Box>
      </Modal>
    </div>
  );
};

export default PopModal;
