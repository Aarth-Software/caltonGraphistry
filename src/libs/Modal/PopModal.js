import { Box, Modal } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const PopModal = ({
  openModal,
  setModalOpen,
  child,
  classProp,
  setAnchorMenu,
}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModalOpen(false));
    if (setAnchorMenu !== undefined) {
      dispatch(setAnchorMenu(false));
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
