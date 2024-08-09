// UploadImageAttachmentPromptSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 
    showPrompt: false,
};

const UploadImageAttachmentPromptSlice = createSlice({
  name: 'uploadImageAttachmentPrompt',
  initialState,
  reducers: {
    showUploadImageAttachmentPrompt: (state, action) => {
     
      state.showPrompt = true;
    },

    hideUploadImageAttachmentPrompt: (state, action) => {
     
        state.showPrompt = false;
      },
    
  },
});

export const { showUploadImageAttachmentPrompt, hideUploadImageAttachmentPrompt } = UploadImageAttachmentPromptSlice.actions;
export default UploadImageAttachmentPromptSlice.reducer;
