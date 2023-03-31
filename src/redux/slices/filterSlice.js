import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterArray: {
      name: "setOne",
      value: "",
      options: ["affiliationFilter", "publicationFilter", "publisherFilter"],
      autoCompleteValue: "",
    },
  },
  reducers: {
    selectAutoCompleteValue: (state, { payload }) => {},
    yearHandleChange: (state, { payload }) => {},
    addSet: (state, { payload }) => {},
    handleOptionsChange: (state, { payload }) => {},
  },
});
