// formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData2: null,
  loading: false,
  successMessage: null,
  errorMessage: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveFormDataRequest: (state) => {
      state.loading = true;
      state.successMessage = null;
      state.errorMessage = null;
    },
    saveFormDataSuccess: (state, action) => {
      state.loading = false;
      state.formData2 = action.payload;
      state.successMessage = 'Form data saved successfully.';
    },
    saveFormDataFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
});

export const {
  saveFormDataRequest,
  saveFormDataSuccess,
  saveFormDataFailure,
  clearMessages,
} = formSlice.actions;

export default formSlice.reducer;