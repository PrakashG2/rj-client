// Copyright © 2022 G2 Tech, All Rights Reserved
import axios from 'axios';
import apiManager, { mainAxios } from '../../api';
import { API_METHODS } from '../../api/constants';
import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
import { config, configuration, user } from '../../common/user';
import store from '../../store';
import { showUploadProgressIndicator, updateUploadProgressIndicator, uploadSucess } from '../../components/UploadProgressIndicator/uploadProgressIndicatorReducer';
import { showSnackbar } from '../../components/customSnackbar/customSnackbarSlice';
import { uploadedSuccesfully } from './jobInformationReducer';


export const jobInformationApi = async (payload) => {
  // try {
    console.log("------------------------- _-__---_-_______------_", payload);

  // const { data } = await mainAxios.get(
  //   `${API_METHODS.GET_JOBS}?page=${payload.page}&limit=10`,
  //   payload
  // );

  const { jobId } = payload;

  // const jobId = "26"

  console.log("------------------------- _-__---_-_______------_");
  console.log("------------------------- _-__---_-_______------_");



  // Construct the query parameters string
  

  // Construct the URL with the query parameters

  // const  response  = await mainAxios.get(API_METHODS.GET_JOB_INFO, payload);

  

  const response = await mainAxios.get(`${API_METHODS.GET_JOB_INFO}?jobId=${jobId}`);

  
  // const response = await mainAxios.get(`${API_METHODS.GET_JOB_INFO}?jobId=27`);

  
  
// console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::", typeof(response.data), response.data.data.accepted)
    return response;
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

// ADD ADHOC COST API
export const addAddhocCostApi = async (payload) => {

  // const { jobId, cost, description } = payload;
  
    // console.log("------------------------- _-__---_-_______------_", jobId);








  



    const response = await mainAxios.post(API_METHODS.POST_ADDHOCK_COST, payload);

  

  // console.log("::::::::::::::::::::::::::::::::::", response.data.job.id)

  
    return response;

  
};

// ADD NOTE API
export const addNoteApi = async (payload) => {

      console.log("------------------------- _-__---_-_______------_", payload.noteText);


  
    const response = await mainAxios.post(API_METHODS.POST_ADD_NOTE, payload);
  
    return response;

  
};




// export const uploadAttachmentApi = async (payload) => {

//   const IMGBB_API_KEY = '853e7c9153f6a5168089105d0aaa80d7';
//   const IMAGE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpsCoCqdZqIwrKDVKtXR2zsb--9F0z9aGgsA&s';


//   try {
//     // Download the image as a base64 encoded string
//     const base64Image = await RNFS.downloadFile({
//       fromUrl: IMAGE_URL,
//       toFile: `${RNFS.DocumentDirectoryPath}/image.jpg`,
//     }).promise.then(() => RNFS.readFile(`${RNFS.DocumentDirectoryPath}/image.jpg`, 'base64'));

//     // Create form data
//     const formData = new FormData();
//     formData.append('image', base64Image);

//     // Make the API call to imgbb
//     const imgbbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });

//     console.log('Upload successful:', imgbbResponse.data);
//     Alert.alert('Upload successful', imgbbResponse.data.data.url);
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     Alert.alert('Error uploading image', error.message);
//   }

// };


// export const uploadAttachmentApi = async (payload) => {

//   const { selectedFile, jobId, description } = payload;


//   const IMGBB_API_KEY = '853e7c9153f6a5168089105d0aaa80d7';
//   const LOCAL_IMAGE_PATH =selectedFile;
//   const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMSIsImVtYWlsIjoibW9iaWxlZGV2QHRlc3QuY29tIiwiaWF0IjoxNzE3NDIxMzA3LCJleHAiOjE3MTc1MDc3MDd9.dzl5mPKEeZ2MHJtzE4NPYEeR0IgVxff02FbpV8BykFA';



//   try {
//     // Read the image file as a base64 encoded string
//     const base64Image = await RNFS.readFile(LOCAL_IMAGE_PATH, 'base64');

//     // Create form data
//     const formData = new FormData();
//     formData.append('documents', {
//       uri: selectedFile,
//       name: 'photo.jpg',
//       type: 'image/jpeg'
//     });
//     formData.append('jobId', jobId);
//     formData.append('description', description);

//     // Make the API call to imgbb
//     const imgbbResponse = await axios.post(`http://172.16.6.122:2258/api/uploadJobDocument`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Authorization': `Bearer ${ACCESS_TOKEN}`,
//       },
//     });

//     console.log('Upload successful:', imgbbResponse.data.files);
//     Alert.alert('Upload successful');
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     console.error('Error uploading image: -------', error.message);

//     Alert.alert('Error uploading image', error.message);
//   }

// };

// export const uploadAttachmentApi = async (payload) => {

//   const { selectedFile, jobId, description, name } = payload;


//   const IMGBB_API_KEY = '853e7c9153f6a5168089105d0aaa80d7';
//   const LOCAL_IMAGE_PATH =selectedFile;
//   const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMSIsImVtYWlsIjoibW9iaWxlZGV2QHRlc3QuY29tIiwiaWF0IjoxNzE3NDIxMzA3LCJleHAiOjE3MTc1MDc3MDd9.dzl5mPKEeZ2MHJtzE4NPYEeR0IgVxff02FbpV8BykFA';

//   const progress = 0;

//   try {
//     // Read the image file as a base64 encoded string
//     const base64Image = await RNFS.readFile(LOCAL_IMAGE_PATH, 'base64');

//     // Create form data
//     const formData = new FormData();
//     formData.append('documents', {
//       uri: selectedFile,
//       name: name,
//       type: 'image/jpeg'
//     });
//     formData.append('jobId', jobId);
//     formData.append('description', description);

//     const accessToken = await user.getAccessToken();

// console.log("-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
// // Iterate over FormData entries and log them
// // for (let pair of formData.entries()) {
// //   console.log(pair[0] + ':', pair[1]);
// // }
//     // Make the API call to imgbb
//     const imgbbResponse = await axios.post(`${API_METHODS.BASEURL}${API_METHODS.POST_UPLOAD_ATTACHMENT}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Authorization': `Bearer ${accessToken}`,
//       },
//       onUploadProgress: (progressEvent) => {
//         store.dispatch(showUploadProgressIndicator());

//         const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         // Dispatch an action with the progress value
//         store.dispatch(updateUploadProgressIndicator({ percentage: progress }));


//         if (progress == 100) {
//           // Dispatch the hideUploadProgressIndicator action and show the success snackbar
//           store.dispatch(uploadSucess());
//         }
//       },
//     });

//     store.dispatch(showSnackbar({ message: 'Upload Success', color: 'green' }));


//     console.log('Upload successful:', imgbbResponse.data);
//     // Alert.alert('Upload successful');

//     return imgbbResponse.data;
//   } catch (error) {
//     store.dispatch(showSnackbar({ message: 'Unable to Complete Upload', color: 'red' }));

//     console.error('Error uploading image: --------------------', error);
//     console.error('Error uploading image: -------', error.message);

//     // Alert.alert('Error uploading image', error.message);
//   }

// };


export const uploadAttachmentApi = async (payload, maxRetries = 3, delayBetweenRetries = 1000) => {
  const { selectedFile, jobId, description, name } = payload;
  const IMGBB_API_KEY = '853e7c9153f6a5168089105d0aaa80d7';
  const LOCAL_IMAGE_PATH = selectedFile;
  const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMSIsImVtYWlsIjoibW9iaWxlZGV2QHRlc3QuY29tIiwiaWF0IjoxNzE3NDIxMzA3LCJleHAiOjE3MTc1MDc3MDd9.dzl5mPKEeZ2MHJtzE4NPYEeR0IgVxff02FbpV8BykFA';
  let retries = 0;

  while (retries < maxRetries) {
    try {

      const baseURL = await configuration.getServerUrl();

      // Read the image file as a base64 encoded string
      const base64Image = await RNFS.readFile(LOCAL_IMAGE_PATH, 'base64');

      // Create form data
      const formData = new FormData();
      formData.append('documents', {
        uri: selectedFile,
        name: name,
        type: 'image/jpeg'
      });
      formData.append('jobId', jobId);
      formData.append('description', description);

      const accessToken = await user.getAccessToken();

      // Make the API call to imgbb
      const imgbbResponse = await axios.post(`${baseURL}${API_METHODS.POST_UPLOAD_ATTACHMENT}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
        },
        onUploadProgress: (progressEvent) => {
          store.dispatch(showUploadProgressIndicator());

          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // Dispatch an action with the progress value
          store.dispatch(updateUploadProgressIndicator({ percentage: progress }));

          if (progress == 100) {
            // Dispatch the hideUploadProgressIndicator action and show the success snackbar
            store.dispatch(uploadSucess());
            store.dispatch(uploadedSuccesfully())
          }
        },
      });

      store.dispatch(showSnackbar({ message: 'Upload Success', color: 'green' }));

      console.log('Upload successful:', imgbbResponse.data);
      return imgbbResponse.data;
    } catch (error) {
      retries++;
      console.error(`Error uploading image (Attempt ${retries}):`, error);

      if (retries < maxRetries) {
        console.log(`Retrying after ${delayBetweenRetries}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayBetweenRetries));
      } else {
        store.dispatch(showSnackbar({ message: 'Unable to Complete Upload', color: 'red' }));
        console.error('Maximum retries reached. Unable to upload image.');
        return { error: 'Maximum retries reached. Unable to upload image.' };
      }
    }
  }
};
