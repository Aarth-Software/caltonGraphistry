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
  postQuery,
} from "../../services/service";
import { fetchKeywords } from "./dashboardSlice";
import {
  setActivePatternWhenRetrive,
  setOpen,
  setOpenSavePannel,
  setSaveName,
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

// export const getDataSetId =
//   async (obj, errorCatch, enqueueSnackbar, values) => async (dispatch) => {
//     if (errorCatch.some((eg) => eg)) {
//       return;
//     }
//     dispatch(setValues({ ...values, loading: true }));
//     try {
//       const response = await GenerateDataSet(obj);
//       if (response.data === "No records found") {
//         dispatch(setValues({ data: response.data, loading: false }));
//         dispatch(setSaveDataSet({ status: false, data: null }));
//       } else {
//         dispatch(setValues({ data: response.data[0], loading: false }));
//         enqueueSnackbar("Generate graph successfull", {
//           variant: "success",
//           autoHideDuration: 2000,
//           style: { width: 300, left: "calc(50% - 150px)" },
//         });
//         dispatch(setSaveDataSet({ status: false, data: null }));
//       }
//     } catch (err) {
//       dispatch(setValues({ ...values, loading: false }));
//       enqueueSnackbar("Generate graph unsuccessfull", {
//         variant: "error",
//         autoHideDuration: 2000,
//         style: { width: 300, left: "calc(50% - 150px)" },
//       });
//       dispatch(setSaveDataSet({ status: false, data: null }));
//     }
//   };

// export const getGenerateGraph =
//   (globelState, setFun, enqueueSnackbar, values) => async (dispatch) => {
//     let errorCatch = [];
//     const cloneObject = { ...globelState };
//     checkError(cloneObject, errorCatch);
//     const valueObj = mergeObjects(cloneObject);
//     dispatch(setSelectParams(valueObj));
//     setFun(cloneObject);
//     getDataSetId(valueObj, errorCatch, enqueueSnackbar, values);
//     for (let d in cloneObject) {
//       if (cloneObject[d].error) {
//         return enqueueSnackbar("please fill mandatory(*) fields", {
//           variant: "error",
//           autoHideDuration: 2000,
//           style: { width: 300, left: "calc(50% - 150px)" },
//         });
//       }
//     }
//     dispatch(setDefaultGraph(false));
//   };

export const getRetriveSavedDataSet = (e, setFun) => (dispatch) => {
  console.log(e);
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
export const getPatternChange = (e, setFun) => (dispatch) => {
  setFun(getAccessPatternVariables(e.code));
  refreshState(setFun);
  dispatch(setPattern(e));
  dispatch(setdropDownOptions(e));
};

export const save =
  (selectParams, values, enqueueSnackbar, user, saveName, nodeState, pattern) =>
  async (dispatch) => {
    if (!values?.data || !Object.keys(selectParams).length) {
      dispatch(setOpenSavePannel(false));
      dispatch(setSaveName(false));
      enqueueSnackbar("Please generate Graph", {
        variant: "error",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
      return;
    }
    const [changeKeys] = [selectParams].map((eg) => {
      return {
        user_id: user?.id,
        node1: eg.nodeA,
        node2: eg.nodeB,
        node3: eg.nodeC,
        keyword1: eg.keywordA,
        keyword2: eg.keywordB,
        keyword3: eg.keywordC,
        query_name: saveName,
        dataset: values.data,
        selection_type: `${Object.keys(nodeState).length}node`,
        selection_code: pattern.code,
      };
    });

    if (saveName.split("").length < 2) {
      enqueueSnackbar("fill mandatory fields", {
        variant: "error",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
      return;
    }

    try {
      const response = await postQuery(changeKeys);
      dispatch(setSaveName(false));
      enqueueSnackbar(response.data.message, {
        variant: "success",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
      dispatch(setOpenSavePannel(false));
      dispatch(setShowStoreOptions(null));
      dispatch(fetchSavedQuaries(user?.id));
      dispatch(fetchKeywords(user?.id));
    } catch (err) {
      enqueueSnackbar("Save graph unsuccessfull", {
        variant: "error",
        autoHideDuration: 2000,
        style: { width: 300, left: "calc(50% - 150px)" },
      });
      dispatch(setOpenSavePannel(false));
      dispatch(setShowStoreOptions(null));
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
  setSaveDataSet,
  setdropDownOptions,
  setPattern,
  setValues,
  setSelectParams,
} = generateQuerySlice.actions;
export const generateQueryReducer = generateQuerySlice.reducer;
