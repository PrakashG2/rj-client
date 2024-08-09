import {combineReducers} from '@reduxjs/toolkit';

// Reducers (assuming you have them in separate files)
import customLoaderReducer from '../components/customLoader/reducer';
import loginReducer from '../screens/Login/loginReducer';
import customSnackbarReducer from '../components/customSnackbar/customSnackbarSlice';
import homeReducer from "../screens/Home/homeReducer";
import jobInformationReducer from "../screens/JonInformation/jobInformationReducer";
import confirmationPromptReducer from "../components/ConfirmationPrompt/reducer";
import drawerReducer from "../components/Drawer/drawerSlice";
import jobFeedBackReducer from "../screens/Feedback/jobFeedBackReducer";
import pdfViewrReducer from "../components/PdfViewer/pdfViewrReducer";
import picturedConfirmationPromptSlice from '../components/PicturedConfirmationPrompt/picturedConfirmationPromptSlice';
import UploadProgressIndicatorSlice from '../components/UploadProgressIndicator/uploadProgressIndicatorReducer';
import UploadImageAttachmentPromptSlice from '../components/UploadImageAttachmentPrompt/UploadImageAttachmentPromptSlice';
import serverConnectSlice from '../screens/ServerConnect/serverConnectSlice';


// Combine reducers
const rootReducer = combineReducers({
  customLoader: customLoaderReducer,
  serverConnect: serverConnectSlice,
  login: loginReducer,
  snackbar: customSnackbarReducer,
  home: homeReducer,
  jobInformation: jobInformationReducer,
  confirmationPrompt: confirmationPromptReducer,
  picturedConfirmationPrompt: picturedConfirmationPromptSlice,
  drawer: drawerReducer,
  jobFeed: jobFeedBackReducer,
  pdfViewer: pdfViewrReducer,
  UploadProgressIndicator: UploadProgressIndicatorSlice, 
  uploadImageAttachmentPrompt: UploadImageAttachmentPromptSlice
});

export default rootReducer;
