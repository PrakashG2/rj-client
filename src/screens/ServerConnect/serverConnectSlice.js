import { createSlice } from '@reduxjs/toolkit';
import { user } from '../../common/user';

const initialState = {
    
    serverConnected: false,
    serverUrl: ""
   
};

export const ServerConnectSlice = createSlice({
    name: 'serverConnect',
    initialState,
    reducers: {
        startServerConnect: (state, action) => {
            state.serverUrl = action.payload.serverUrl;
            console.log("-----------------------^^", action.payload.serverUrl);
        },
       ServerConnectSuccess: (state, action) => {

           state.serverConnected = true;
           console.log("-----------------------^^", state.serverConnected);

        },
        disconnectServer: (state, actions) => {
state.serverConnected = false,
    state.serverUrl = ""
        }
        
    },
});

// Action creators are generated for each case reducer function
export const { startServerConnect, ServerConnectSuccess, disconnectServer } = ServerConnectSlice.actions;

export default ServerConnectSlice.reducer;
