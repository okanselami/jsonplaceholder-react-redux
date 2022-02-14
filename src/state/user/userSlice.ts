import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../service/json-placeholder';
import { API } from '../../service';

// type definitions
type UserState = {
  data: User[];
  loading: boolean;
  error: string | null;
  selectedUser: string;
};

// initial state
const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
  selectedUser: '',
};

/**
 *
 */
export const getUsersAsync = createAsyncThunk('posts/getPosts', async () => {
  const response = await API.getUsers().then((users) => {
    return users;
  });

  return response;
});

/**
 * slice
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectUser: (state, action) => {
      if (!action.payload) {
        state.selectedUser = '';
      } else {
        state.selectedUser = action.payload.toString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = 'an error occured';
      });
  },
});

export const { selectUser } = userSlice.actions;

export default userSlice.reducer;
