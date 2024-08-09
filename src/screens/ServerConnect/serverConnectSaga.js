import { call, put, takeLatest } from 'redux-saga/effects';
import { serverConnectApi } from './api';
import { logger } from '../../common/logger';
import { showLoader, hideLoader } from '../../components/customLoader/reducer';
import { showSnackbar } from '../../components/customSnackbar/customSnackbarSlice';
import { ServerConnectSuccess, startServerConnect } from './serverConnectSlice';
import { COLOR } from '../../utilities/colors';

function* serverConnect(action) {
  try {
    yield put(showLoader());
    console.log("action.payload",action.payload)

    // Call the serverConnectApi function with the action payload
    const response = yield call(serverConnectApi, action.payload);
    console.log("response.error",response.error)
    if (response.error == "Invalid email or password.") {
      yield put(ServerConnectSuccess()); // Dispatch the action without payload
      yield put(showSnackbar({ message: "Server Connected", color: "green" }));

    }else {
        yield put(showSnackbar({ message: "Unable to connect", color: COLOR.RED }));

    }
   
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
    yield put(showSnackbar({ message: errorMessage, color: COLOR.RED }));
  } finally {
    // Hide the loader regardless of success or failure
    yield put(hideLoader());
  }
}

export const serverConnectSagas = [takeLatest(startServerConnect.type, serverConnect)];
