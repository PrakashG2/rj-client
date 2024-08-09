import { call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { loginApi } from './api';
import { logger } from '../../common/logger';
import { loginSuccess, startLogin } from './loginReducer';
import { hideLoader, showLoader } from '../../components/customLoader/reducer';
import { showSnackbar } from '../../components/customSnackbar/customSnackbarSlice';
import { config, configuration, user } from '../../common/user';
import { COLOR } from '../../utilities/colors';

function* login(action) {
  try {
    yield put(showLoader());
    const response = yield call(loginApi, action.payload);

    const userData = {
      access_token: response.accessToken,
      first_name: response.firstname,
      last_name: response.lastname,
      id: response.id,
      email: action.payload.email,
      password: action.payload.password,
      serverUrl: action.payload.serverUrl
    
    };


    let serverUrl = action.payload.serverUrl;

    const serverUrlCache = yield call(configuration.getServerUrl);
    
    // if (serverUrl && serverUrl.trim() !== '') {
    //     const serverUrlObj = { serverUrl: serverUrl };
        
    //     // Store serverUrl using configuration.setServerUrl
    //     yield call(configuration.setServerUrl, serverUrlObj);
    // }

    if (action.payload.serverUrl == "") {
      serverUrl = serverUrlCache;
    }

    console.log("::::::::::::::::::::::::::::::::::::::::::::::::::", action.payload.serverUrl)

    yield call(configuration.setServerUrl, serverUrl);

    



    yield put(showSnackbar({ message: 'Login Success', color: 'green' }));
    yield call(user.login, userData);
    yield put(loginSuccess());
  } catch (error) {
    logger.error(error);
    let errorMessage = 'An unexpected error occurred';
    
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    yield put(showSnackbar({ message: errorMessage, color: COLOR.RED }));

    // Alert.alert('Login Failed', errorMessage);
  } finally {
    yield put(hideLoader());
  }
}

export const authSagas = [takeLatest(startLogin.type, login)];
