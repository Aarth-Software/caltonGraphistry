import { createSlice, current } from "@reduxjs/toolkit";
import {
  getDefaultDataSet,
  getDropdowns,
  getUserRecords,
} from "../../services/service";

const generateQuerySlice = createSlice({
  name: "query",
  initialState: {
    fetchOnce: true,
    defaultGraphStatus: true,
    dropdownLoading: false,
    dropdownData: [],
    defaultGraphLoading: false,
    defaultDataset: "",
    savedRecords: [],
    saveRecordsLoading: false,
    recordsFetchError: false,
  },
  reducers: {
    setFetchOnce: (state, { payload }) => {
      state.fetchOnce = payload;
    },
    setDefaultGraph: (state, { payload }) => {
      state.defaultGraphStatus = payload;
    },
    setDropdownData: (state, { payload }) => {
      state.dropdownData = payload;
      //   console.log(current(state));
    },
    setDropdownLoading: (state, { payload }) => {
      state.dropdownLoading = payload;
    },
    setDefaultGraphLoading: (state, { payload }) => {
      state.defaultGraphLoading = payload;
    },
    setDefaultDataset: (state, { payload }) => {
      state.defaultDataset = payload;
      //   console.log(current(state));
    },
    setSavedRecords: (state, { payload }) => {
      state.savedRecords = payload;
      console.log(current(state));
    },
    setSavedRecordsLoading: (state, { payload }) => {
      state.saveRecordsLoading = payload;
    },
    setSaveRecordsFetchError: (state, { payload }) => {
      state.recordsFetchError = payload;
    },
    removeRecord: (state, { payload }) => {
      console.log(payload);
      const remaining = state.savedRecords.filter(
        (_, i) => i !== payload.activeBg
      );
      state.savedRecords = remaining;
    },
    editRecordName: (state, { payload }) => {
      const edited = state.savedRecords.map((eg, i) =>
        i === payload.activeBg ? { ...eg, query_name: payload.editedValue } : eg
      );
      state.savedRecords = edited;
    },
  },
});

export const fetchDropdownValues = () => async (dispatch) => {
  try {
    dispatch(setDropdownLoading(true));
    const response = await getDropdowns();
    dispatch(setDropdownData(response.data));
    dispatch(setDropdownLoading(false));
  } catch (err) {
    console.log(err);
    dispatch(setDropdownLoading(null));
  }
};
export const fetchDefaultGraph = () => async (dispatch) => {
  try {
    dispatch(setDefaultGraphLoading(true));
    const response = await getDefaultDataSet();
    dispatch(setDefaultDataset(response.data));
    dispatch(setDefaultGraphLoading(false));
  } catch (err) {
    dispatch(setDefaultGraphLoading(null));
  }
};
export const fetchSavedQuaries = (kc) => async (dispatch) => {
  try {
    dispatch(setSaveRecordsFetchError(false));
    dispatch(setSavedRecordsLoading(true));
    const response = await getUserRecords({ userId: kc });
    console.log(response.data);
    dispatch(setSavedRecords(response.data));
    dispatch(setSavedRecordsLoading(false));
  } catch (err) {
    dispatch(setSavedRecordsLoading(null));
    dispatch(setSaveRecordsFetchError(true));
  }
};
export const {
  setFetchOnce,
  setDefaultGraph,
  setDropdownData,
  setDropdownLoading,
  setDefaultGraphLoading,
  setDefaultDataset,
  setSavedRecords,
  setSavedRecordsLoading,
  setSaveRecordsFetchError,
  editRecordName,
  removeRecord,
} = generateQuerySlice.actions;
export const generateQueryReducer = generateQuerySlice.reducer;
