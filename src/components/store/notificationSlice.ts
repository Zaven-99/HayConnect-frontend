import { createSlice } from "@reduxjs/toolkit";

interface notificationSliceState {
  isOpen: boolean;
  isClosing: boolean;
}

const initialState: notificationSliceState = {
  isOpen: false,
  isClosing: false,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    openNotifications: (state) => {
      state.isOpen = true;
      state.isClosing = false;
    },
    closeNotifications: (state) => {
      state.isOpen = false;
      state.isClosing = false;
    },
    startClosingNotifications: (state) => {
      state.isClosing = true;
    },
  },
});

export const {
  openNotifications,
  closeNotifications,
  startClosingNotifications,
} = notificationSlice.actions;
export default notificationSlice.reducer;
