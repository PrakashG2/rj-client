import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prompt: false,
  buttonOneText: "", // Set default values for buttons
  buttonOneTextStyle: {},
  buttonTwoText: "",
  buttonTwoStyle: {},
  message: "",
  jobId: null
};

export const confirmationPromptSlice = createSlice({
  name: 'confirmationPrompt',
  initialState,
  reducers: {
    showPrompt: (state, action) => {
        console.log("++++++++++++++++++++++++++++++", action.payload.buttonOneText)
        state.prompt = true;
        state.buttonOneText = action.payload.buttonOneText;
        state.buttonOneTextStyle = action.payload.buttonOneTextStyle;
        state.buttonOneOnPress = action.payload.buttonOneOnPress;
        state.buttonTwoText = action.payload.buttonTwoText;
        state.buttonTwoStyle = action.payload.buttonTwoStyle;
        state.buttonTwoOnPress = action.payload.buttonTwoOnPress;
        state.message = action.payload.message;
        state.jobId = action.payload.jobId
      },
      
      
      
    
    hidePrompt: (state) => {
     state.prompt = false;
    },
  },
});

// Action creators with type information (optional for improved debugging)
export const { showPrompt, hidePrompt } = confirmationPromptSlice.actions;

export default confirmationPromptSlice.reducer;
