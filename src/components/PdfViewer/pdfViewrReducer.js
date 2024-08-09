import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: true,
  pdfData: null,
  error: null,
};

export const pdfViewerSlice = createSlice({
  name: 'pdfViewer',
  initialState,
  reducers: {
    showPdfViewer: (state, action) => {
      state.visible = true;
      state.pdfData = action.payload.pdfData;
    },
    hidePdfViewer: (state) => {
      state.visible = false;
    },
  
  },
});

export const { showPdfViewer, hidePdfViewer } = pdfViewerSlice.actions;

export default pdfViewerSlice.reducer;
