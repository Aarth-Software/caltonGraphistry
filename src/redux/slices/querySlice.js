import { createSlice } from "@reduxjs/toolkit";
import {
  refreshState,
  retriveSavedGraphValues,
} from "../../libs/HigherOrderFunctions";
import {
  btnArray,
  getAccessPatternVariables,
} from "../../libs/Switches/SelectionSwitches";
import {
  getDefaultDataSet,
  getDropdowns,
  getUserRecords,
} from "../../services/service";
import {
  setActivePatternWhenRetrive,
  setOpen,
  setShowStoreOptions,
} from "./serviceSlice";

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
    savedDataSet: { status: false, data: null },
    dropdownOptions: {
      node_1: {
        value: ["Construct (Ind. Var.)"],
      },
      node_2: {
        "Construct (Ind. Var.)": [
          "Construct (Mediator)",
          "Construct (Moderator)",
        ],
      },
      node_3: {
        "Construct (Mediator)": ["Construct (Dep. Var.)"],
        "Construct (Moderator)": ["Construct (Dep. Var.)"],
      },
      selection_type: "3node",
    },
    pattern: {
      nodeA: true,
      nodeB: true,
      nodeC: true,
    },
    values: { data: [], loading: null },
    selectParams: {},
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
    },
    setSavedRecordsLoading: (state, { payload }) => {
      state.saveRecordsLoading = payload;
    },
    setSaveRecordsFetchError: (state, { payload }) => {
      state.recordsFetchError = payload;
    },
    removeRecord: (state, { payload }) => {
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
    setSaveDataSet: (state, { payload }) => {
      state.savedDataSet = payload;
    },
    setdropDownOptions: (state, { payload }) => {
      const specificObject = state.dropdownData?.data?.find(
        (d) => d.selection_type === payload.selection_type
      );
      console.log(payload);
      state.dropdownOptions = specificObject;
    },
    setPattern: (state, { payload }) => {
      state.pattern = payload;
    },
    setValues: (state, { payload }) => {
      state.values = payload;
    },
    setSelectParams: (state, { payload }) => {
      state.selectParams = payload;
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
    dispatch(setSavedRecords(response.data));
    dispatch(setSavedRecordsLoading(false));
  } catch (err) {
    dispatch(setSavedRecordsLoading(null));
    dispatch(setSaveRecordsFetchError(true));
  }
};

export const getRetriveSavedDataSet = (e, setFun) => (dispatch) => {
  // setFun = setNodeState
  dispatch(setDefaultGraph(false));
  setFun(getAccessPatternVariables(e.selection_code));
  retriveSavedGraphValues(e, setFun);
  const fixPattern = btnArray.findIndex((eg) => eg.code === e.selection_code);
  dispatch(setPattern(btnArray[fixPattern]));
  dispatch(setActivePatternWhenRetrive(fixPattern));
  dispatch(setdropDownOptions(e));
  dispatch(setSaveDataSet({ status: true, data: e.dataset }));
  dispatch(setShowStoreOptions(null));
  dispatch(setOpen(false));
};
// export const getPatternChange = (e) => (dispatch) => {
//   setNodeState(getAccessPatternVariables(e.code));
//   refreshState(setNodeState);
//   dispatch(setPattern(e));
//   dispatch(setdropDownOptions(e));
// };
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
  setSaveDataSet,
  setdropDownOptions,
  setPattern,
  setValues,
  setSelectParams,
} = generateQuerySlice.actions;
export const generateQueryReducer = generateQuerySlice.reducer;
