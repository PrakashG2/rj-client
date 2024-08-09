// UploadProgressIndicatorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  visible: false,
  percentage: 0,
};

const UploadProgressIndicatorSlice = createSlice({
  name: 'uploadProgressIndicator',
  initialState,
  reducers: {
    showUploadProgressIndicator: (state, action) => {
     
      state.visible = true;
    },
    hideUploadProgressIndicator: (state) => {
      state.visible = false;
      state.percentage = 0;
    },
    updateUploadProgressIndicator: (state, action) => {
        state.percentage = action.payload.percentage;

      },
      uploadSucess: (state, action) => {
        state.percentage = 0;
        state.visible = false;

      },
  },
});

export const { showUploadProgressIndicator, hideUploadProgressIndicator,uploadSucess, updateUploadProgressIndicator } = UploadProgressIndicatorSlice.actions;
export default UploadProgressIndicatorSlice.reducer;
