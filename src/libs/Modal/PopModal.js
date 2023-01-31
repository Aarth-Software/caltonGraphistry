import { Box, Modal } from "@mui/material";
import React from "react";

const PopModal = ({ openModal, setModalOpen, child, classProp }) => {
  const handleClose = () => setModalOpen(false);
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
