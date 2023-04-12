import { createSlice } from "@reduxjs/toolkit";
import { postContact } from "../../services/service";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contactMessages: [],
    inviteMailStatus: true,
    invitedMail: "",
    requestMailStatus: null,
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
    setInviteMailStatus: (state, { payload }) => {
      state.inviteMailStatus = payload;
    },
    setInvitedMail: (state, { payload }) => {
      state.invitedMail = payload;
    },
    setRequestMailStatus: (state, { payload }) => {
      state.requestMailStatus = payload;
    },
  },
});

export const askHelp = (document, navigate) => async (dispatch) => {
  try {
    const res = await postContact(document);
    console.log(res.data);
    dispatch(setRequestMailStatus(true));
    navigate("/contact-us/status");
  } catch (err) {
    dispatch(setRequestMailStatus(false));
    navigate("/contact-us/status");
  }
};

export const {
  setContactRequests,
  removeContactMessage,
  approveMessage,
  setInviteMailStatus,
  setInvitedMail,
  setRequestMailStatus,
} = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
