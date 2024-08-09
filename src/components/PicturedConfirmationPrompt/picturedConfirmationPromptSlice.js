import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  promptVisiblity: false,
  buttonOneText: "",
  buttonOneStyle: {},
  buttonOneOnPress: {},

  buttonTwoText: "",
  buttonTwoStyle: {},
  buttonTwoOnPress: {},
  message: "",
};

export const picturedConfirmationPromptSlice = createSlice({
  name: 'picturedConfirmationPrompt',
  initialState,
  reducers: {
    showPicturedPrompt: (state, action) => {
        state.promptVisiblity = true;
        state.buttonOneText = action.payload.buttonOneText;
        state.buttonOneStyle = action.payload.buttonOneTextStyle;
        state.buttonOneOnPress = action.payload.buttonOneOnPress;
        state.buttonTwoText = action.payload.buttonTwoText;
        state.buttonTwoStyle = action.payload.buttonTwoStyle;
        state.buttonTwoOnPress = action.payload.buttonTwoOnPress;
        state.message = action.payload.message;
      },
      
      
      
    
    hidePicturedPrompt: (state) => {
     state.promptVisiblity = false;
    },
  },
});

// Action creators with type information (optional for improved debugging)
export const { showPicturedPrompt, hidePicturedPrompt } = picturedConfirmationPromptSlice.actions;

export default picturedConfirmationPromptSlice.reducer;
