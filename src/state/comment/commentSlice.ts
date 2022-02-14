import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../service';

// type definitions
export type Comment = {
  id: number;
  body: string;
  postId: number;
};

export type CommentState = {
  data: Comment[];
  loading: boolean;
  error: string | null;
};

// initial state
const initialState: CommentState = {
  data: [],
  loading: false,
  error: null,
};

/**
 *
 */
export const getCommentsByPostIdAsync = createAsyncThunk(
  'comment/getCommentsByPostId',
  async (postId: string) => {
    try {
      const response = await API.getCommentsByPostId(postId);
      return response;
    } catch (error) {}
  }
);

/**
 * slice
 */
export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommentsByPostIdAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCommentsByPostIdAsync.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
  },
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
