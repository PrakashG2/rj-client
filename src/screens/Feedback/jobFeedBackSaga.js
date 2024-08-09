import {Alert} from 'react-native';
import {call, put, takeLatest} from 'redux-saga/effects';
import {jobFeedBackApi, loginApi, updateJobApi} from './api';
import {logger} from '../../common/logger';
import {loginSuccess, startLogin} from './loginReducer';
import {hideLoader, showLoader} from '../../components/customLoader/reducer';
import {showSnackbar} from '../../components/customSnackbar/customSnackbarSlice';
import { user } from '../../common/user';
import { getJobs, setFeedBack, setJobs, updateJobs } from './jobFeedBackReducer';

function* jobFeedBack(action) {
  try {
    yield put(showLoader());
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', action.payloa);
    // yield put(showLoader());
    const response = yield call(jobFeedBackApi, action.payload);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx123456789', response.data.message);
     yield put(showSnackbar({message: response.data.message, color: 'green'}));


   
  } catch (error) {
    logger.error(error);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx123');

  
  } finally {
    yield put(hideLoader());

  }
}



export const jobFeedBackSagas = [takeLatest(setFeedBack.type, jobFeedBack)];
