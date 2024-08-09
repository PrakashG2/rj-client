import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawerOpen: false,
  
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state) => {
        state.drawerOpen = true
      },
      
      
      
    
    closeDrawer: (state) => {
        state.drawerOpen = false
    },
  },
});

// Action creators with type information (optional for improved debugging)
export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
