import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import raitingReducer from "./raitingSlice";
import commentReducer from "./commentSlice";
import chatReducer from "./chatSlice";
import notificationReducer from "./notificationSlice";
import userMenuReducer from "./userMenuSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    raiting: raitingReducer,
    comment: commentReducer,
    chat: chatReducer,
    notifications: notificationReducer,
    userMenu: userMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
