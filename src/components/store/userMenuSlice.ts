import { createSlice } from "@reduxjs/toolkit";

interface userMenuState {
  isOpen: boolean;
  isClosing: boolean;
}

const initialState: userMenuState = {
  isOpen: false,
  isClosing: false,
};

const userMenuSlice = createSlice({
  name: "userMenu",
  initialState,
  reducers: {
    openUserMenu: (state) => {
      state.isOpen = true;
      state.isClosing = false;
    },
    closeUserMenu: (state) => {
      state.isOpen = false;
      state.isClosing = false;
    },
    startClosingUserMenu: (state) => {
      state.isClosing = true;
    },
  },
});

export const { openUserMenu, closeUserMenu, startClosingUserMenu } =
  userMenuSlice.actions;
export default userMenuSlice.reducer;
