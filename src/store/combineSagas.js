import {all} from 'redux-saga/effects';

//
import { authSagas } from "../screens/Login/loginSaga";
import { homeSagas } from "../screens/Home/homeSaga";
import { jobInformationSagas } from '../screens/JonInformation/jobInformationSaga';
import { jobFeedBackSagas } from "../screens/Feedback/jobFeedBackSaga";
import { serverConnectSagas } from '../screens/ServerConnect/serverConnectSaga';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...serverConnectSagas,
    ...homeSagas,
    ...jobInformationSagas,
    ...jobFeedBackSagas,
  ]);
}
