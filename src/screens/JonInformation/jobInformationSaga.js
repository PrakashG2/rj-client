import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';
import { addAddhocCostApi, addNoteApi, jobInformationApi, loginApi, uploadAttachmentApi } from './api';
import { logger } from '../../common/logger';
import { loginSuccess, startLogin } from './loginReducer';
import { hideLoader, showLoader } from '../../components/customLoader/reducer';
import { showSnackbar } from '../../components/customSnackbar/customSnackbarSlice';
import { user } from '../../common/user';
import { addAddhocCost, addNote, getJobInformation, getJobs, setJobInformation, setJobs, uploadAttachment } from './jobInformationReducer';
import { COLOR } from '../../utilities/colors';

function* jobInformation(action) {
  try {
    yield put(showLoader());

    const response = yield call(jobInformationApi, action.payload);


    yield put(setJobInformation(response.data))



  } catch (error) {
    logger.error(error);

  } finally {
    yield put(hideLoader());

  }
}


function* addAddHocCostSaga(action) {
  try {
    yield put(showLoader());

    const response = yield call(addAddhocCostApi, action.payload);

    yield put(showSnackbar({ message: response.data.message, color: "green" }));
    yield put(hideLoader());

    // Refresh the job information screen
    const jobId = action.payload.jobId;
    yield put(getJobInformation({ jobId }));
  } catch (error) {
    yield put(hideLoader());

    logger.error(error);
    yield put(showSnackbar({ message: 'Failed to Add AdHoc cost', color: COLOR.RED }));
  } 
}

function* addNoteSaga(action) {
  try {
    yield put(showLoader());

    const response = yield call(addNoteApi, action.payload);

    yield put(showSnackbar({ message: response.data.message, color: "green" }));
    yield put(hideLoader());

     // Refresh the job information screen
    const jobId = action.payload.jobId;
    yield put(getJobInformation({ jobId: jobId }));

    
  } catch (error) {
    yield put(hideLoader());

    logger.error(error);
    yield put(showSnackbar({ message: 'Failed to Add Note', color: COLOR.RED }));
  } 
}

function* uploadAttachmentSaga(action) { // Image only
  try {
    yield put(showLoader());

    const response = yield call(uploadAttachmentApi, action.payload);
    

    // yield put(showSnackbar({ message: response.data.message, color: "green" }));
    yield put(hideLoader());

     // Refresh the job information screen
    const jobId = action.payload.jobId;
    yield put(getJobInformation({ jobId }));
    
  } catch (error) {
    yield put(hideLoader());

    logger.error(error);
    yield put(showSnackbar({ message: 'Failed to Upload', color: COLOR.RED }));
  } 
}



export const jobInformationSagas = [
  takeLatest(getJobInformation.type, jobInformation),
  takeLatest(addAddhocCost.type, addAddHocCostSaga),
  takeLatest(addNote.type, addNoteSaga),
  takeLatest(uploadAttachment.type, uploadAttachmentSaga)
];