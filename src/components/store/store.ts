import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import raitingReducer from "./raitingSlice";
import commentReducer from "./commentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    raiting: raitingReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
