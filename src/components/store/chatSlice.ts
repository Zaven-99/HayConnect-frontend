import { createSlice } from "@reduxjs/toolkit";

interface ChatState {
  isOpen: boolean;
  isClosing: boolean;
}

const initialState: ChatState = {
  isOpen: false,
  isClosing: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    openChat: (state) => {
      state.isOpen = true;
      state.isClosing = false;
    },
    closeChat: (state) => {
      state.isOpen = false;
      state.isClosing = false;
    },
    startClosingChat: (state) => {
      state.isClosing = true;
    },
  },
});

export const { openChat, closeChat, startClosingChat } = chatSlice.actions;
export default chatSlice.reducer;
