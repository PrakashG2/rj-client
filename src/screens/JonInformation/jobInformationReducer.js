import { createSlice } from '@reduxjs/toolkit';
import { user } from '../../common/user';
import { addAddhocCostApi } from './api';

const initialState = {
    jobInformation: [],
    jobLocation: [],
};

export const jobInformationSlice = createSlice({
    name: 'jobInformation',
    initialState,
    reducers: {

        getJobInformation: (state, action) => {

        },
        setJobInformation: (state, action) => {
            state.jobInformation = action.payload
            state.jobLocation = action.payload.data?.job?.location?.address || "";

        },

        //
        addAddhocCost: (state, action) => {
            console.log("++++++++++++++++++++++++")
        },

        //
        addNote: (state, action) => {
            console.log("++++++++++++++++++++++++|")
        },
        
        //
        uploadAttachment: (state, action) => {
            state.jobId = action.payload.jobId;
            console.log("++++++++++++++++++++++++------- |", action.payload.jobId)
        },

        uploadedSuccesfully : (state, action) => {

            


            }



    },
});

// Action creators are generated for each case reducer function
export const { getJobInformation, setJobInformation, addAddhocCost, addNote, uploadAttachment, uploadedSuccesfully } = jobInformationSlice.actions;

export default jobInformationSlice.reducer;
