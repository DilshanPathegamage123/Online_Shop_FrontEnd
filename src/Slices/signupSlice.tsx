import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import api from '../api';

interface SignUpState {
    formData: {
      first_name: string;
      last_name: string;
      user_name: string;
      email: string;
      password: string;
      confirm_password: string;
    };
    loading: boolean;
    error: string | null;
  }

  const initialState: SignUpState = {
    formData: {
      first_name: '',
      last_name: '',
      user_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    loading: false,
    error: null,
  };

  const signUpSlice = createSlice({
    name : 'signup',
    initialState,
    reducers: {
        updateFormData: (state, action: PayloadAction<Partial<SignUpState['formData']>>) => {
            state.formData = { ...state.formData, ...action.payload };
          },
          setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
          },
signUpStart: (state) => {
    state.loading = true;
    state.error = null;
},
signUpSuccess: (state) => {
    state.loading= false;
    state.error = null;
},
signUpFailure: (state, action: PayloadAction<string>) => {
    state.loading = false;
    state.error = action.payload;
},
    
    }
  });

  export const { updateFormData, signUpStart, signUpSuccess, signUpFailure, setError } = signUpSlice.actions;

  export const signUp = (formData: SignUpState['formData']) => async (dispatch: AppDispatch) => {
    dispatch(signUpStart());
    try {
      const registrationData = {
        ...formData,
        role: 'customer',
      };
      await api.post('/auth/register', registrationData);
      dispatch(signUpSuccess());
    } catch (err: any) {
      dispatch(signUpFailure(err.response?.data?.message || 'Registration failed. Please try again.'));
    }
  };
  
  export default signUpSlice.reducer;
