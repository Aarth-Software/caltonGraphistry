import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import counterReducer from "./slices/counter";
import { generateQueryReducer } from "./slices/querySlice";
import { dashboardReducer } from "./slices/dashboardSlice";

export const store = configureStore(
  {
    reducer: {
      counter: counterReducer,
      query: generateQueryReducer,
      dashboard: dashboardReducer,
    },
  },
  composeWithDevTools()
);
