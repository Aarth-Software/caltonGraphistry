import { createSlice, current } from "@reduxjs/toolkit";
import { dashBoardData, getKeywords } from "../../services/service";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardFetchOnce: true,
    keywords: [],
    keywordsLoading: false,
    dashboardInfo: [],
    dashboardInfoLoading: false,
  },
  reducers: {
    setDashboardFetchOnce: (state, { payload }) => {
      state.dashboardFetchOnce = payload;
    },
    setKeywordsLoading: (state, { payload }) => {
      state.keywordsLoading = payload;
    },
    setKeywords: (state, { payload }) => {
      state.keywords = payload;
      console.log(current(state));
    },
    setDashboardInfoLoading: (state, { payload }) => {
      state.dashboardInfoLoading = payload;
    },
    setDashboardInfo: (state, { payload }) => {
      state.dashboardInfo = payload;
      console.log(current(state));
    },
  },
});

export const fetchKeywords = (kc) => async (dispatch) => {
  try {
    dispatch(setKeywordsLoading(true));
    const response = await getKeywords({ userId: kc });
    dispatch(setKeywords(response.data));
    dispatch(setKeywordsLoading(false));
  } catch (err) {
    dispatch(setKeywordsLoading(null));
  }
};
export const fetchDashboardInfo = () => async (dispatch) => {
  try {
    dispatch(setDashboardInfoLoading(true));
    const response = await dashBoardData();
    dispatch(setDashboardInfo(JSON.parse(response.data)));
    dispatch(setDashboardInfoLoading(false));
  } catch (err) {
    dispatch(setDashboardInfoLoading(null));
  }
};

export const {
  setDashboardFetchOnce,
  setKeywordsLoading,
  setKeywords,
  setDashboardInfoLoading,
  setDashboardInfo,
} = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
