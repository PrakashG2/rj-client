// import axios from 'axios';
// import { API_METHODS } from "./constants";

// axios.defaults.headers.post['Content-Type'] = 'application/json';
// // axios.defaults.headers.common['x-access-token'] = "hhhhhhhhhhhhhhhhhhhhhhhhhhhh";


// export const apiManager = axios.create({
//   baseURL: API_METHODS.BASEURL,
// });


// const logger = (message) => {
//   console.log(`LOGGER -||||- ${new Date().toISOString()} ${message}`);
// };



// apiManager.interceptors.request.use((config) => {
//     const urlWithParams = new URL(config.url, config.baseURL); // Create a URL object

//   logger(`SENDING REQUEST TO : ---------> ${config.url}`);
//   logger('SENDING REQUEST CONFIG: ------------------>', config.params);
//   console.log(`SENDING REQUEST TO: ---------> `,urlWithParams.toString());

//   return config;
// });

// apiManager.interceptors.response.use(
//   (response) => {
//     logger(`RECEIVED RESPONSE FROM : ----------> ${response.config.url}`);
//     logger(`RESPONSE DATA: ----------> ${JSON.stringify(response.data)}`);
//     return response;
//   },
//   (error) => {
//     logger(`ERROR IN REQUEST TO ---------->: ${error.config.url}`);
//     logger(`ERROR MESSAGE ---------->: ${error.message}`);
//     return Promise.reject(error);
//   }
// );

// export default apiManager;


import axios from 'axios';
import { logger } from '../common/logger';
import { user, configuration } from '../common/user'; // Renamed to configData to avoid collision
import { API_TIMEOUT } from './constants';
import { API_METHODS } from "./constants";
import { logout, startLogin } from '../screens/Login/loginReducer';
import { Alert } from 'react-native';
import store from '../store';
import { CONFIG_DATA } from '../constants';



axios.defaults.headers.post['Content-Type'] = 'application/json';

// Create a new Axios instance for the main API manager
export const mainAxios = axios.create({
    // baseURL: API_METHODS.BASEURL,
    timeout: 100000
});


  


// Request interceptor
mainAxios.interceptors.request.use(
    
    async (config) => {

        try {
            // const baseURL = await user.getServerUrl()

            const baseURL = await configuration.getServerUrl();

            console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[ ==========================, ", baseURL)

            // Add authorization header if the user is logged in
            const isLoggedIn = await user.isLoggedIn();
            if (isLoggedIn) {
                const accessToken = await user.getAccessToken();

                // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0IiwiZW1haWwiOiJkZW1vQGNvbXB1dGVjaC5zb2Z0d2FyZSIsImlhdCI6MTcxMzk1MjQ1NiwiZXhwIjoxNzE0MDM4ODU2fQ.B09XuIo6zsR9AtXxm2IHrK-V08PHTXygkUF9kFyyL3M";

                
                config.headers = {
                    Authorization: `Bearer ${accessToken}`
                  };

                  config.baseURL = baseURL;


                 
            }
        } catch (error) {
            logger.error('Error in request interceptor:', error);
        }
        if (__DEV__) {
            logger.log("Request config:", config);
            logger.log("--- ||| --- Request sent to:", config.url);
        }
        return config;
    },
    (error) => {
        logger.error('Error in request interceptor:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
mainAxios.interceptors.response.use(
    (response) => {
        
        if (__DEV__) {
            logger.log(" --- ||| --- Response:", response.data);
            logger.log("--- ||| --- Response received from:", response.config.url);
        }
        // Check for specific error conditions in the response and handle them
        // For example, check for 401 (unauthorized) and handle session expiration
        return response;
    },
    async (error) => {
        logger.error('Error in response interceptor:', error);
        // if (error.response && error.response.data && error.response.data === "Invalid Token") {
        // logout();
        // }
        // Handle different types of errors and provide appropriate error messages

       if (error.code === 'ECONNABORTED') {
      // Timeout error
      Alert.alert(
        'Error',
        'Request timed out. Please try again later.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    } else  if (error.response &&  error.response.status && error.response.status === 401) {
       
        }
    
    else if (error.response && error.response.status === 401 && error.response.data === "Invalid Token"){
        // const userData =  await user.getAllUserData();
        // console.log("Invalid creds ----------> ", error.response.data, userData.password

        // )
        // user.logout();
        const userData =  await user.getAllUserData();

        store.dispatch(startLogin({email: userData.email,
            password: userData.password}));

            console.error('Network error:______________________________________________________');


    } else {
      // Handle other network errors


    
      Alert.alert(
        'Error',
        'Something went wrong !. Please try again later',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
      console.error('Network error:', error);
      logger.error('Network error:', error); // Assuming logger logs more details
    }



        return Promise.reject(error);
    }
);


