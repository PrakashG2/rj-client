import { createSlice } from '@reduxjs/toolkit';
import { user } from '../../common/user';

const initialState = {
    
};

export const jobFeedBackSlice = createSlice({
    name: 'jobFeedBack',
    initialState,
    reducers: {
        setFeedBack: (state, action) => {
            console.log("+_+_+_+_+##################################################")

        },
       
        
    },
});

// Action creators are generated for each case reducer function
export const {setFeedBack} = jobFeedBackSlice.actions;

export default jobFeedBackSlice.reducer;
