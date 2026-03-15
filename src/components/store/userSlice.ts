import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IUser, IFormValues } from "../auth/types/auth.types";

interface UserState {
  user: IUser | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    { data, rememberMe }: { data: IFormValues; rememberMe: boolean },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          rememberMe,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Server Error");
      }

      const user = await response.json();
      return user;
    } catch {
      return rejectWithValue("Network Error");
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    { data, rememberMe }: { data: IFormValues; rememberMe: boolean },
    { rejectWithValue },
  ) => {
    const dateOfBirth = `${data.year}-${data.month.padStart(2, "0")}-${data.day.padStart(2, "0")}`;
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          gender: data.gender,
          dateOfBirth: dateOfBirth,
          avatar: "default.png",
          rememberMe,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Server Error");
      }

      const user = await response.json();
      return user;
    } catch {
      return rejectWithValue("Network Error");
    }
  },
);
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await fetch("http://localhost:8080/api/users/logout", {
    method: "POST",
    credentials: "include",
  });
});

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/users/me", { credentials: "include" });
      if (!res.ok) throw new Error("Not authenticated");
      return await res.json();
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Unknown error");
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/users/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      console.log(email);

      if (!res.ok) {
        const errorData = await res.text();
        return rejectWithValue(errorData || "Server Error");
      }

      const message = await res.text();
      return message;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Unknown error",
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, newPassword }: ResetPasswordPayload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/users/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        },
      );

      const data = await res.text();

      if (!res.ok) {
        return rejectWithValue(data || "Server Error");
      }

      return data;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Unknown error",
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFromMe(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUserFromMe, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
