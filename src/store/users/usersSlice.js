import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const USERS_URL = 'https://randomuser.me/api/?results=5'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(USERS_URL);
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch users.');
  }
});

const initialState = {
  users: [],
  isLoading: false,
  error: undefined
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
  }
});

export const selectUsers = (state) => state.users.users;
export const selectIsLoading = (state) => state.users.isLoading;
export const selectError = (state) => state.users.error;

export default usersSlice.reducer;
