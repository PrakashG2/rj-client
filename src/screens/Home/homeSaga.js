import {Alert} from 'react-native';
import {call, put, takeLatest} from 'redux-saga/effects';
import {homeApi, loginApi, updateJobApi} from './api';
import {logger} from '../../common/logger';
import {loginSuccess, startLogin} from './loginReducer';
import {hideLoader, showLoader} from '../../components/customLoader/reducer';
import {showSnackbar} from '../../components/customSnackbar/customSnackbarSlice';
import { user } from '../../common/user';
import { getJobs, setJobs, updateJobs } from './homeReducer';

function* home(action) {
  try {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++', action.payload.page);
    // yield put(showLoader());

    yield put(showLoader());

    const response = yield call(homeApi, action.payload);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx123456789', response.data);


    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ->', response.accessToken);

yield put(setJobs(response))
    // yield put(showSnackbar({message: 'Login Success', color: 'green'}));

   
  } catch (error) {
    logger.error(error);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx123');

    // if (error.response && error.response.data && error.response.data.message) {
    //   // If there's a specific error message in the API response, show it in an alert
    //   // Alert.alert("Login Failed", error.response.data.message);
    //   yield put(
    //     showSnackbar({message: error.response.data.message, color: 'red'}),
    //   );
    // } else {
    //   // If there's no specific error message, show a generic error message
    //   Alert.alert('Fetching Jobs Failed', `An unexpected error occurred: ${error.response.data}`);
    // }
  } finally {
    yield put(hideLoader());

    // yield put(hideLoader());
  }
}

//

function* updateJob(action) {
  try {
    yield put(showLoader());
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', action.payload.page);
    yield put(showLoader());

    const response = yield call(updateJobApi, action.payload);

    yield put(getJobs({page:1}))

    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx123456789');

    if (response.message && response.message === "Job Completed successfully") {
      yield put(showSnackbar({message: response.message, color: 'green'}));
    }



    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ->', response.accessToken);

// yield put(setJobs(response.data))
    // yield put(showSnackbar({message: 'Login Success', color: 'green'}));

   
  } catch (error) {
    logger.error(error);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx123');

    // if (error.response && error.response.data && error.response.data.message) {
    //   // If there's a specific error message in the API response, show it in an alert
    //   // Alert.alert("Login Failed", error.response.data.message);
    //   yield put(
    //     showSnackbar({message: error.response.data.message, color: 'red'}),
    //   );
    // } else {
    //   // If there's no specific error message, show a generic error message
    //   Alert.alert('Fetching Jobs Failed', `An unexpected error occurred: ${error.response.data}`);
    // }
  } finally {
    yield put(hideLoader());

    // yield put(hideLoader());
  }
}

export const homeSagas = [takeLatest(getJobs.type, home), takeLatest(updateJobs, updateJob)];
