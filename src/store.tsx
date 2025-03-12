import { configureStore, createReducer, createAction, createSlice } from '@reduxjs/toolkit';
import signUpReducer from './Slices/signupSlice';
import authReducer from './Slices/authSlice';
import productReducer from './Slices/productSlice';

// Create store
export const store = configureStore({
  reducer: {
    // auth: authReducer
    auth: authReducer,
    signUp : signUpReducer,
    product: productReducer
  }
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;