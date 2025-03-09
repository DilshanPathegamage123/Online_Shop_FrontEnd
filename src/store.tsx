import { configureStore, createReducer, createAction } from '@reduxjs/toolkit';

// Define action types
export const login = createAction<{token: string, userRole: 'admin' | 'customer'}>('auth/login');
export const logout = createAction('auth/logout');

// Define initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  userRole: localStorage.getItem('userRole') as 'admin' | 'customer' | null
};

// Create reducer
const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      const { token, userRole } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.userRole = userRole;
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole);
    })
    .addCase(logout, (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userRole = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    });
});

// Create store
export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;