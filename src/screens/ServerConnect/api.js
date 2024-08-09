import axios from 'axios';
import { API_METHODS } from '../../api/constants';
import { err } from 'react-native-svg';

export const serverConnectApi = async (payload) => {
  const { serverUrl, email, password } = payload;

    console.log("+++++++++++++++++++++++++++++++++++++", serverUrl, email)

  try {
    const { data } = await axios.post(`${serverUrl}${API_METHODS.TODO}`, {
        email,
        password
      });
    console.log("Response Data:", data);
    return data;
  } catch (error) {
    let errorMessage = "An unexpected error occurred";

    let serverConnected = false;

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
      serverConnected = true;
    } else if (error.message) {
      errorMessage = error.message;
    }

    console.error("Error:", errorMessage);
    console.log("----------------------", serverConnected)

    return { error: errorMessage };

  }
};
