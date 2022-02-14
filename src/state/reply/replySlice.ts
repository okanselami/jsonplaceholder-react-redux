import { createSlice } from '@reduxjs/toolkit';

// type definitions for the slice
export type ReplyState = {
  data: Array<ReplyData>;
  loading: boolean;
  error: string | null;
};

export type ReplyData = {
  postId: number;
  commentId: number;
  reply: string
};

// initial state
const initialState: ReplyState = {
  data: [],
  loading: false,
  error: null,
};

/**
 * slice
 */
export const replySlice = createSlice({
  name: 'reply',
  initialState,
  reducers: {
    postReply: (state, action) => {
        const { postId, commentId, reply } = action.payload;    
        state.data.push({ postId, commentId, reply });
    },
  },
});

export const { postReply } = replySlice.actions;

export default replySlice.reducer;
