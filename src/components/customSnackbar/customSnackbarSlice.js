// snackbarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  visible: false,
  color: '',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
        console.log("- show snackbar")
      state.message = action.payload.message;
      state.visible = true;
      state.color = action.payload.color;
    },
    hideSnackbar: (state) => {
      state.visible = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
