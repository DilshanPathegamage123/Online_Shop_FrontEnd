import { createSlice} from '@reduxjs/toolkit';


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    userRole: localStorage.getItem('userRole') as 'admin' | 'customer' | null
  };

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

  export const { login, logout} = authSlice.actions;
  
  export default authSlice.reducer;