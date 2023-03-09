import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    anchorMenu: null,
    activeBg: "",
    editPannel: false,
    editedValue: "",
    searchDate: "",
  },
  reducers: {
    setAnchorMenu: (state, { payload }) => {
      state.anchorMenu = payload;
    },
    setActiveBg: (state, { payload }) => {
      state.activeBg = payload;
    },
    setEditPannel: (state, { payload }) => {
      state.editPannel = payload;
    },
    setEditedValue: (state, { payload }) => {
      state.editedValue = payload;
    },
    setSearchDate: (state, { payload }) => {
      state.searchDate = payload;
    },
  },
});
