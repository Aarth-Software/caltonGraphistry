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
  getFilters,
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
import {
  retriveFilterValues,
  setFilterOptions,
  setInitilFilterState,
} from "./filterSlice";

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
    queryFilters: {},
    filterLoading: false,
    filterError: false,
    fetchFiltersOnce: true,
    helperFilterContainer: [],
    initialYearOptions: { startYear: [], endYear: [] },
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
    setFilters: (state, { payload }) => {
      state.queryFilters = payload;
    },
    setFilterLoading: (state, { payload }) => {
      state.filterLoading = payload;
    },
    setFilterError: (state, { payload }) => {
      state.filterError = payload;
    },
    setFetchFiltersOnce: (state, { payload }) => {
      state.fetchFiltersOnce = payload;
    },
    sendToHelperContainer: (state, { payload }) => {
      const selectFilterElements = [
        ...new Set([...state.helperFilterContainer, payload]),
      ];
      state.helperFilterContainer = selectFilterElements;
    },
    setInitialYearOptions: (state, { payload }) => {
      state.initialYearOptions = {
        startYear: payload?.fromYear,
        endYear: payload?.toYear?.map(Number).sort((a, b) => a - b),
      };
    },
  },
});

export const fetchDropdownValues = (setFun) => async (dispatch) => {
  try {
    dispatch(setDropdownLoading(true));
    const response = await getDropdowns();
    dispatch(setDropdownData(response.data));
    dispatch(
      getPatternChange(
        {
          // btn: tripleNodeD,
          grow: 3,
          // active: aTripleNodeD,
          nodeA: true,
          nodeB: true,
          nodeC: true,
          series: true,
          unUsedA: true,
          unUsedC: true,
          code: "tripleNcA",
          selection_type: "3node",
        },
        setFun
      )
    );
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
  dispatch(retriveFilterValues(e));
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
        dataset: !values.data,
        selection_type: `${Object.keys(nodeState).length - 5}node`,
        selection_code: pattern.code,
        fromYear: eg.fromYear,
        toYear: eg.toYear,
        affiliationFilter: eg.affiliationFilter,
        publicationFilter: eg.publicationFilter,
        publisherFilter: eg.publisherFilter,
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
      console.log(response.data);
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
export const getFilterOptions = () => async (dispatch) => {
  try {
    dispatch(setFilterLoading(true));
    const response = await getFilters();
    dispatch(setFilters(JSON.parse(response.data)));
    dispatch(setInitialYearOptions(JSON.parse(response.data)));
    dispatch(
      setInitilFilterState(
        Object.keys(JSON.parse(response.data)).filter(
          (eg) => !["fromYear", "toYear"].includes(eg)
        )
      )
    );
    dispatch(
      setFilterOptions(
        Object.keys(JSON.parse(response.data)).filter(
          (eg) => !["fromYear", "toYear"].includes(eg)
        )
      )
    );
    dispatch(setFilterLoading(false));
  } catch (err) {
    console.log(err);
    dispatch(setFilterLoading(null));
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
  setFilterLoading,
  setFilters,
  setFetchFiltersOnce,
  sendToHelperContainer,
  setInitialYearOptions,
} = generateQuerySlice.actions;
export const generateQueryReducer = generateQuerySlice.reducer;
