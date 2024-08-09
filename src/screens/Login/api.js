// Copyright © 2022 G2 Tech, All Rights Reserved
import axios from 'axios';
import apiManager, { mainAxios } from '../../api';
import { API_METHODS } from '../../api/constants';
import {  configuration, user } from '../../common/user';

export const loginApi = async (payload) => {

  const { serverUrl, email, password } = payload;

  let serverBaseUrl = serverUrl;

  // try {
    
  if (serverUrl == "") {
      const url = await configuration.getServerUrl()

      serverBaseUrl = url;

    
  }

  console.log("=============================================", serverUrl)


    const { data } = await axios.post(`${serverBaseUrl}${API_METHODS.TODO}`,{ email, password } );
    console.log("-------------------------", data);
    return data;
  // } catch (error) {
  //   // If an error occurs, check if there's a response with an error message
  //   if (error.response && error.response.data && error.response.data.message) {
  //     const errorMessage = error.response.data.message;
  //     console.error("Error:", errorMessage);
  //     // You can handle the error message here, like displaying it to the user
  //     return { error: errorMessage };
  //   } else {
  //     // If there's no specific error message in the response, log the error object
  //     console.error("Error:", error);
  //     return { error: "An unexpected error occurred" };
  //   }
  // }
};
