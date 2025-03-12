import { configureStore, createReducer, createAction, createSlice } from '@reduxjs/toolkit';

// Define action types
// export const login = createAction<{token: string, userRole: 'admin' | 'customer'}>('auth/login');
// export const logout = createAction('auth/logout');

// Define initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  userRole: localStorage.getItem('userRole') as 'admin' | 'customer' | null
};

// Create reducer
// const authReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(login, (state, action) => {
//       const { token, userRole } = action.payload;
//       state.token = token;
//       state.isAuthenticated = true;
//       state.userRole = userRole;
//       localStorage.setItem('token', token);
//       localStorage.setItem('userRole', userRole);
//     })
//     .addCase(logout, (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//       state.userRole = null;
//       localStorage.removeItem('token');
//       localStorage.removeItem('userRole');
//     });
// });

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, userRole} = action.payload;
      state.token = token;
      state.isAuthenticated= true;
      state.userRole = userRole;
      localStorage.setItem('token', token); 
      localStorage.setItem('userRole', userRole);
       },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userRole = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    }
  }
});

//Export Actions
export const { login, logout} = authSlice.actions;

// Create store
export const store = configureStore({
  reducer: {
    // auth: authReducer
    auth: authSlice.reducer
  }
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;