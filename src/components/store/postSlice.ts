import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CreatePostForm } from "../createPost/types/createPost.types";
import { compressImage } from "../../../utils/compressImage";

interface PostState {
  post: CreatePostForm[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  post: [],
  loading: false,
  error: null,
};

export const addPost = createAsyncThunk(
  "post/setPost",
  async (
    { data, files }: { data: CreatePostForm; files: File[] },
    { rejectWithValue },
  ) => {
    const compressedFiles = await Promise.all(
      files.map((file) => compressImage(file, 1024, 1024, 0.7)),
    );
    const formData = new FormData();

    formData.append("text", data.text);

    compressedFiles.forEach((file) => {
      formData.append("images", file, file.name);
    });

    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          return rejectWithValue("Please login to create a post");
        }
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Server Error");
      }

      const post = await response.json();
      return post;
    } catch (error) {
      console.error("Network Error:", error);
      return rejectWithValue("Network Error");
    }
  },
);

export const getPost = createAsyncThunk(
  "post/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          return rejectWithValue("Please login to view posts");
        }
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Server Error");
      }

      const posts = await response.json();

      return posts;
    } catch {
      return rejectWithValue("Network Error");
    }
  },
);

export const getPostByUserId = createAsyncThunk(
  "post/fetchPostsById",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/posts/user/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          return rejectWithValue("Please login to view posts");
        }
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Server Error");
      }

      const posts = await response.json();
      return posts;
    } catch {
      return rejectWithValue("Network Error");
    }
  },
);
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost(state, action: PayloadAction<CreatePostForm>) {
      state.post.unshift(action.payload);
      state.loading = false;
    },
    removePost(state, action: PayloadAction<string>) {
      state.post = state.post.filter((post) => post.id !== action.payload);
    },
    updatePost(state, action: PayloadAction<CreatePostForm>) {
      const index = state.post.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.post[index] = action.payload;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post.unshift(action.payload);
        state.error = null;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
        state.error = null;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getPostByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(getPostByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPost, removePost, updatePost } = postSlice.actions;
export default postSlice.reducer;
