import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../service/json-placeholder';
import { API } from '../../service';

// type definitions
type PostState = {
  data: Post[];
  loading: boolean;
  error: string | null;
  selectedPostId: string | null;
};

// initial state
const initialState: PostState = {
  data: [],
  loading: false,
  error: null,
  selectedPostId: null,
};

/**
 *
 */
export const getPostsAsync = createAsyncThunk('post/getPosts', async () => {
  try {
    const response = await API.getPosts();
    return response;
  } catch (error) {}
});

/**
 * slice
 */
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectPostId: (state, action) => {
      state.selectedPostId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPostsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = 'an error occured';
      });
  },
});

export const { selectPostId } = postSlice.actions;

/**
 *  Comment selector by postId
 * @param state
 * @param postId
 * @returns
 */
export const selectCommentsByPostId = (state: any, postId: string | null) => {
  if (!postId) return [];
  const post = state?.posts?.data.find((post: Post) => post.id == postId);
  return post ? post.comments : [];
};

export default postSlice.reducer;
