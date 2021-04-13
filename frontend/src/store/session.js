import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetch } from './csrf';

export const login = createAsyncThunk('session/login', async (user) => {
  const { credential, password } = user;
  const response = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  return response.data.user;
})

export const restoreUser = createAsyncThunk('session/restoreUser', async () => {
  const response = await fetch('/api/session');
  return response.data.user;
});

export const registerUser = createAsyncThunk('session/registerUser', async (user) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
  return response.data.user;
});

export const logoutUser = createAsyncThunk('session/logoutUser', async () => {
  const response = await fetch('/api/session', {
    method: 'DELETE',
  });
  return response;
});

const initialState = {
  user: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, _action) => {
        state.user = null;
      })
  },
});

export default sessionSlice.reducer;
