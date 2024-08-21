import { createSlice } from '@reduxjs/toolkit';
import { user } from '../../common/user';
import { navigate } from '../../navigation/NavigationService';

const initialState = {
    value: 0,
    isLogin: false,
    isLoading: false,
    // lastLoggedIn: new Date()
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        startLogin: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state) => {
            console.log("------------- 123 ---------")

            state.isLogin = true;
            state.isLoading = false;
        },
        // updateLastLoggedIn: (state, action) => {
        //     state.lastLoggedIn = new Date();
        // },
        logout: (state, action) => {
            state.isLogin = false;
            user.logout();
        }
    },
});

// Action creators are generated for each case reducer function
export const { startLogin, loginSuccess, logout } = loginSlice.actions;

export default loginSlice.reducer;
