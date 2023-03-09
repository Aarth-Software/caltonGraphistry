import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    defaultGraphStatus: true,
  },
  reducers: {
    setDefaultGraph: (state, { payload }) => {
      state.defaultGraphStatus = payload;
    },
  },
});

export const { setDefaultGraph } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
