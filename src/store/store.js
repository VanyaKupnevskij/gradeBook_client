import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../modules/AuthorizationModule';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
