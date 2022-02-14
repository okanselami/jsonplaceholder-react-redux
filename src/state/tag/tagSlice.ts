import { createSlice } from '@reduxjs/toolkit';

// type definitions for the slice
export type TagState = {
  data: Array<TagsData>;
  loading: boolean;
  error: string | null;
};

export type TagsData = {
  postId: number;
  commentId: number;
  tags: string[];
};

// initial state
const initialState: TagState = {
  data: [],
  loading: false,
  error: null,
};

/**
 * slice
 */
export const tagSlice = createSlice({
  name: 'reply',
  initialState,
  reducers: {
    postTags: (state, action) => {
      const { postId, commentId, tag } = action.payload;

      if (state.data.length === 0) {
        state.data.push({ postId, commentId, tags: tag });
      } else {
        const index = state.data.findIndex(
          (item) => item.postId == postId && item.commentId == commentId
        );
        if (index === -1) {
          state.data.push({ postId, commentId, tags: tag });
        } else {
          state.data[index].tags = tag;
        }
      }
    },
  },
});

export const { postTags } = tagSlice.actions;

export const selectTags = (state: TagState) => {
  const arr = state.data
    .map((item) => {
      return item.tags.map((tag) => {
        return tag;
      });
    })
    .flat();
    
  return Array.from(new Set(arr));
};

export default tagSlice.reducer;
