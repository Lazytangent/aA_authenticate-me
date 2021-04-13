import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';

const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});

export default store;
