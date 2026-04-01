import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { IComment } from "../post/types/post.types";

interface CommentState {
  comments: Record<string, IComment[]>;
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: {},
  loading: false,
  error: null,
};

export const getComments = createAsyncThunk<
  { postId: string; comments: IComment[]; page: number },
  { postId: string; page: number },
  { rejectValue: string }
>("comments/getComments", async ({ postId, page }, { rejectWithValue }) => {
  try {
    const res = await fetch(
      `http://localhost:8080/comments/post/${postId}?page=${page}&size=15`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    const data = await res.json();

    if (!res.ok) return rejectWithValue(data.message || "Error");

    console.log("COMMENTS RESPONSE:", data);
    return {
      postId,
      page,
      comments: Array.isArray(data) ? data : data.content || [],
    };
  } catch {
    return rejectWithValue("Network Error");
  }
});

export const addComment = createAsyncThunk<
  { postId: string; comment: IComment },
  { postId: string; text: string },
  { rejectValue: string }
>("comments/addComment", async ({ postId, text }, { rejectWithValue }) => {
  try {
    const res = await fetch(`http://localhost:8080/comments/post/${postId}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    if (!res.ok) return rejectWithValue(data.message || "Error");

    const newComment: IComment = {
      id: data.id,
      text: data.text || text,
      createdAt: data.createdAt || new Date().toISOString(),
      rating: data.rating ?? 0,
      authorName: data.author?.name || "You",
      authorAvatar: data.author?.avatar || "",
    };

    return { postId, comment: newComment };
  } catch {
    return rejectWithValue("Network Error");
  }
});

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const oldComments = state.comments[postId] || [];
        state.comments[postId] = [...oldComments, comment];
      })

      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;

        const { postId, comments, page } = action.payload;
        const oldComments = state.comments[postId] || [];

        state.comments[postId] =
          page === 0 ? comments : [...oldComments, ...comments];
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error adding comment";
      });
  },
});

export default commentSlice.reducer;
