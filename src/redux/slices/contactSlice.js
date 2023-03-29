import { createSlice } from "@reduxjs/toolkit";
import { postContact } from "../../services/service";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contactMessages: [],
  },
  reducers: {
    setContactMessages: (state, { payload }) => {
      state.contactMessages = payload;
    },
    removeContactMessage: (state, { payload }) => {
      state.contactMessages = payload;
    },
    approveMessage: (state, { payload }) => {
      state.contactMessages = payload;
    },
  },
});

export const askHelp = (document) => async (dispatch) => {
  try {
    const response = await postContact(document);
    console.log(response?.data);
  } catch (err) {
    console.log(err);
  }
};

export const { setContactRequests, removeContactMessage, approveMessage } =
  contactSlice.actions;
export const contactReducer = contactSlice.reducer;
