import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IUser, IFormValues } from "../auth/types/auth.types";
import { rateItem } from "./raitingSlice";

interface UserState {
  user: IUser | null;
  isLoggedIn: boolean;
  viewedUser: IUser | null;
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
  loading: true,
  error: null,
  viewedUser: null,
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

      let result;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok) {
        let message = "Server Error";

        if (response.status === 401) {
          message = result?.error || "Invalid email or password";
        } else if (response.status === 400) {
          message = result?.error || "Bad request";
        } else if (response.status === 500) {
          message = "Server crashed";
        }

        return rejectWithValue(message);
      }

      return result;
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message || "Network Error");
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
          ratingAvg: data.ratingAvg,
          dateOfBirth: dateOfBirth,
          rememberMe,
          avatar: "",
          images: [],
          posts: [],
          folowers: [],
          folowing: [],
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
      const res = await fetch("http://localhost:8080/api/users/me", {
        credentials: "include",
      });

      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        if (contentType?.includes("text/html")) {
          return rejectWithValue("Not authenticated");
        }
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Server error");
      }

      const data = await res.json();

      return data;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Unknown error");
    }
  },
);

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:8080/api/users/user/${id}`, {
        credentials: "include",
      });
      if (!res.ok) return rejectWithValue("User not found");

      return await res.json();
    } catch {
      return rejectWithValue("Network Error");
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:8080/api/users/update", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.text();
        return rejectWithValue(error || "Server error");
      }

      const user = await res.json();
      return user;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Network error",
      );
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
    setUserRatingAvg: (
      state,
      action: PayloadAction<{ userId: number; ratingAvg: number }>,
    ) => {
      if (state.user && state.user.id === action.payload.userId) {
        state.user.ratingAvg = action.payload.ratingAvg;
      }
    },
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
      .addCase(rateItem.fulfilled, (state, action) => {
        const { id, type, rating, ratingAvg } = action.payload;
        const newAvg = ratingAvg ?? rating;

        if (type === "user") {
          if (state.user && String(state.user.id) === String(id)) {
            state.user.ratingAvg = newAvg;
          }
          if (state.viewedUser && String(state.viewedUser.id) === String(id)) {
            state.viewedUser.ratingAvg = newAvg;
          }
        }
      })
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
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.viewedUser = action.payload;
      });
  },
});

export const { setUserFromMe, clearUser, setLoading, setUserRatingAvg } =
  userSlice.actions;
export default userSlice.reducer;
