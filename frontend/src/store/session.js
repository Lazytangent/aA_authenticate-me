import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetch } from './csrf';

const SET_SESSION = 'session/SET_SESSION';
const REMOVE_SESSION = 'session/REMOVE_SESSION';

const setSession = (user) => {
  return {
    type: SET_SESSION,
    user,
  };
};

const removeSession = () => {
  return {
    type: REMOVE_SESSION,
  };
};

// export const login = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await fetch('/api/session', {
//     method: 'POST',
//     body: JSON.stringify({
//       credential,
//       password,
//     }),
//   });
//   dispatch(setSession(response.data.user));
//   return response;
// };

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

// export const restoreUser = () => async (dispatch) => {
//   const response = await fetch('/api/session');
//   dispatch(setSession(response.data.user));
//   return response;
// };

export const restoreUser = createAsyncThunk('session/restoreUser', async () => {
  const response = await fetch('/api/session');
  return response.data.user;
});

// export const registerUser = (user) => async (dispatch) => {
//   const response = await fetch('/api/users', {
//     method: 'POST',
//     body: JSON.stringify(user),
//   });
//   dispatch(setSession(response.data.user));
//   return response;
// };

export const registerUser = createAsyncThunk('session/registerUser', async (user) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
  return response.data.user;
});

// export const logoutUser = () => async (dispatch) => {
//   const response = await fetch('/api/session', {
//     method: 'DELETE',
//   });
//   dispatch(removeSession());
//   return response;
// };

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

// const sessionReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_SESSION:
//       return { ...state, user: action.user }
//     case REMOVE_SESSION:
//       return { ...state, user: null };
//     default:
//       return state;
//   }
// };

// export default sessionReducer;

export default sessionSlice.reducer;
