import { createSlice } from '@reduxjs/toolkit';
import { user } from '../../common/user';

const initialState = {
    jobs: [],
    activeJobs: [],
    completedJobs: [],
    attachments: [],
  counts: [],

    renderedPages: 0,
    activeCounts: 0,
};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setJobs: (state, action) => {
            console.log("+_+_+_+_+##################################################")

            // state.jobs = true;
            // console.log("----------< home reducer", action.payload)
            // state.jobs = [...state.jobs, ...action.payload];
            state.jobs = action.payload.data;
            state.activeJobs = action.payload.data.filter(job => !job.completed && !job.draft);
            // state.completedJobs = action.payload.filter(job => job.completed);

            state.attachments = action.payload.attachments;
            state.counts = [
                action.payload.totalCount - action.payload.draftCount,
                action.payload.activeCount,


              action.payload.finishedCount,
              action.payload.draftCount
            ];            


            // if (action.payload) {
            //     state.renderedPages =( state.renderedPages +1)
            // }

        },
        getJobs: (state, action) => {
            console.log("----------< home reducer <<<<<<<<< get jobs !!!!!!!!!!",action.payload.page)

        },
        getFilteredJobs: (state) => {
  console.log("hello --------------------------------------------------->")
  

        },

        updateJobs: (state) => {

        }
        
    },
});

// Action creators are generated for each case reducer function
export const { setJobs, getJobs, getJobsData, updateJobs } = homeSlice.actions;

export default homeSlice.reducer;
