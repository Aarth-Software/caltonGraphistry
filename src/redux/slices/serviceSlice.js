import { createSlice, current } from "@reduxjs/toolkit";
import { deleteRecord, updateRecord } from "../../services/service";
import { fetchKeywords } from "./dashboardSlice";
import { editRecordName, removeRecord } from "./querySlice";
const serviceSlice = createSlice({
  name: "popup",
  initialState: {
    anchorMenu: null,
    activeBg: "",
    editPannel: false,
    editedValue: "",
    searchDate: "",
    openSavePanel: false,
    open: false,
    showStoreOptions: null,
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
    setOpenSavePannel: (state, { payload }) => {
      state.openSavePanel = payload;
    },
    setOpen: (state, { payload }) => {
      state.open = payload;
    },
    setShowStoreOptions: (state, { payload }) => {
      state.showStoreOptions = payload;
    },
    setSaveName: (state, { payload }) => {
      state.saveName = payload;
    },
  },
});

export const getDeleteRecords =
  (kc, activeBg, data, enqueueSnackbar) => async (dispatch) => {
    try {
      await deleteRecord({
        uuid: data[activeBg].uuid,
      });
      dispatch(setAnchorMenu(false));
      dispatch(setActiveBg(null));
      enqueueSnackbar(
        `Query with title with ${data[activeBg].query_name} successfully deleted`,
        {
          variant: "success",
          autoHideDuration: 2000,
          style: { width: 600, left: "calc(50% - 300px)" },
        }
      );
      dispatch(fetchKeywords(kc));
      dispatch(removeRecord({ activeBg }));
    } catch (err) {
      dispatch(setAnchorMenu(false));
      dispatch(setActiveBg(null));
      enqueueSnackbar(`Delete action unsuccessfull`, {
        variant: "error",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
    }
  };

export const getEditRecord =
  (activeBg, data, editedValue, enqueueSnackbar) => async (dispatch) => {
    console.log([activeBg, data, editedValue]);
    try {
      await updateRecord({
        uuid: data[activeBg].uuid,
        query_name: editedValue,
      });
      dispatch(setAnchorMenu(false));
      dispatch(setActiveBg(null));
      enqueueSnackbar(`Query name successfully updated`, {
        variant: "success",
        autoHideDuration: 2000,
        style: { width: 400, left: "calc(50% - 200px)" },
      });
      dispatch(editRecordName({ activeBg, editedValue }));
      dispatch(setEditPannel(false));
    } catch (err) {
      dispatch(setAnchorMenu(null));
      dispatch(setActiveBg(null));
      dispatch(setEditPannel(false));
      enqueueSnackbar(`Update action unsuccessfull`, {
        variant: "error",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
    }
  };

export const {
  setAnchorMenu,
  setActiveBg,
  setEditPannel,
  setEditedValue,
  setSearchDate,
  setOpenSavePannel,
  setOpen,
  setShowStoreOptions,
  setSaveName,
} = serviceSlice.actions;

export const serviceReducer = serviceSlice.reducer;
