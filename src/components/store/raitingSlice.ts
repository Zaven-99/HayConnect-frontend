// store/raitingSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RaitingState {
  ratings: Record<string, number>;
  loading: boolean;
  error: string | null;
}

const initialState: RaitingState = {
  ratings: {},
  loading: false,
  error: null,
};

export const rateItem = createAsyncThunk<
  { id: string; rating: number; type?: string },
  { id: string; rating: number; type?: string },
  { rejectValue: string }
>("raiting/rateItem", async ({ id, rating, type }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `http://localhost:8080/ratings/${type}/${id}?value=${rating}`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data.message || "Server Error");
    }
    return { id, rating, type };
  } catch {
    return rejectWithValue("Network Error");
  }
});

const raitingSlice = createSlice({
  name: "raiting",
  initialState,
  reducers: {
    setRaiting: (
      state,
      action: PayloadAction<{ id: string; rating: number }>,
    ) => {
      state.ratings[action.payload.id] = action.payload.rating;
    },
    removeRaiting: (state, action: PayloadAction<string>) => {
      delete state.ratings[action.payload];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(rateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(
      //   rateItem.fulfilled,
      //   (state, action: PayloadAction<{ id: string; rating: number }>) => {
      //     state.loading = false;
      //     state.ratings[action.payload.id] = action.payload.rating;
      //   },
      // )
      // raitingSlice.ts - в extraReducers
      .addCase(rateItem.fulfilled, (state, action) => {
        state.loading = false;
        const { id, rating, type } = action.payload;
        const key = type ? `${type}_${id}` : id;
        state.ratings[key] = rating;
      })
      .addCase(rateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { setRaiting, removeRaiting } = raitingSlice.actions;

export default raitingSlice.reducer;
