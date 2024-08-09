import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const customLoaderSlice = createSlice({
  name: 'customLoader',
  initialState,
  reducers: {
    showLoader: state => {
      state.loading = true;
      console.log("************------------ SHOW***********************************************************************************************************************")
    },
    hideLoader: state => {
      state.loading = false;
      console.log("************------------ HIDE***********************************************************************************************************************")

    },
  },
});

// Action creators are generated for each case reducer function
export const {showLoader, hideLoader} = customLoaderSlice.actions;

export default customLoaderSlice.reducer;
