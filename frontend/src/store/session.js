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

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  response.data = await response.json();
  dispatch(setSession(response.data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await fetch('/api/session');
  response.data = await response.json();
  dispatch(setSession(response.data.user));
  return response;
};

export const registerUser = (user) => async (dispatch) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    response.data = await response.json();
    dispatch(setSession(response.data.user));
    return response;
  } catch (e) {
    return e.json().then((data) => {
      e.data = data;
      throw e;
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  const response = await fetch('/api/session', {
    method: 'DELETE',
  });
  response.data = await response.json();
  dispatch(removeSession());
  return response;
};

const initialState = {
  user: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      return { ...state, user: action.user }
    case REMOVE_SESSION:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
